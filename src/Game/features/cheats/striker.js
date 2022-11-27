import { config, striker, utils, sync } from '../../../index.js';

export default class Striker {
    #initialized = false;
    aimBotTarget = undefined;
    #config = config.data.weaponData.strikerData;

    rocketTP = {
        target: undefined,
        state: false,
        timeout: undefined,
        teleportToTarget: false,
        index: 0
    }

    reset = () => {
        this.#initialized = false;
        this.aimBotTarget = undefined;
        this.rocketTP = {
            target: undefined,
            state: false,
            timeout: undefined,
            teleportToTarget: false,
            index: 0
        }
    }

    shellsTeleport = (strikerComponent, strikerShells) => {
        const shellsConfig = this.#config.shellsTeleportData,
            shells = strikerShells.shellCache_0?.itemsInUse?.toArray();

        if (!utils.isArrayValid(shells))
            return;

        for (const shell of shells) {
            if (typeof shell.components === 'undefined' || !utils.isArrayValid(shell.components?.['originalArray']))
                shell.components = utils.getComponentNames(shell.components_0.array);

            if (!shell.components)
                continue;

            if (shellsConfig.state)
                shell.components['StrikerRocket']?.direction?.init_y2kzbl$(0, 0, 0);//射出火箭的方向

            const server = shell.components['StrikerRocketComponent'];

            if (!server)
                continue;

          // server.staticHit_0 = () => {};    //静态的打击
           // server.selfDestruct_0 = () => {};//判断是否在特殊服务器
        }

        if (!shellsConfig.state || !this.rocketTP.target)
            return;

        const target = utils.getTankById(this.rocketTP.target),
            targetState = target?.['TankPhysicsComponent']?.body?.state;

        if (!targetState)//敌人状态不正常，这条应该是返回
            return;

        if (this.rocketTP.state !== true && shells.length === strikerComponent.salvoRocketsCount && 
                !this.rocketTP.timeout) 
        {
            const lastShell = shells.at(-1).components,
                distance = lastShell?.['RaycastShell']?.barrelOrigin.distance_ry1qwf$(targetState.position);

            if (this.rocketTP.teleportToTarget) {
                this.rocketTP.timeout = setTimeout(() => {
                    this.rocketTP.state = true;
                    this.rocketTP.timeout = undefined;
                }, 2000);
            } else if (lastShell?.['StrikerRocket']?.distance_0 >= distance) {
                this.rocketTP.state = true;
            }
        }

        if (utils.isBindPressed(shellsConfig))
            this.rocketTP.state = true;
            
        if (!this.rocketTP.state)
            return;

        if (this.rocketTP.timeout) {
            clearTimeout(this.rocketTP.timeout);
            this.rocketTP.timeout = undefined;
        }

        this.rocketTP.state = false;

        for (const shell of shells) {
            const server = shell.components['StrikerRocketComponent'];
            
            server.shellStates_0.lastKnownState_0.position.init_ry1qwf$(targetState.position);
            server.serverInterface_0.tryToHit_nn87qu$(server.world.physicsTime, server.raycastShell_0.shellId, 
            erver.shellStates_0);//服务器接口
        }
        //判断导弹个数
        for (let i = 0; i < strikerComponent.salvoRocketsCount; i++) {
            strikerComponent.explodeRockets();
        }
    }

    aimBot = (physics, weaponTrigger, turret) => {
        const aimBotConfig = this.#config.aimBotData;
        
        if (!aimBotConfig.state || !weaponTrigger.pulled_0 || utils.isBindPressed(aimBotConfig))
            return;

        const target = utils.getTankById(this.aimBotTarget),
            targetState = target?.['TankPhysicsComponent']?.body?.state;

        if (!targetState)
            return;

        const p1 = physics.body.state.position,
            p2 = targetState.position;

        turret.direction = turret.getLocalDirectionFromWorldDirection_0(
            Math.atan2(p2.y - p1.y, p2.x - p1.x) - Math.PI / 2
        );
    }

    nextTarget = () => {
        const tanks = utils.getTanks();

        if (!utils.isArrayValid(tanks))
            return;

        if (this.rocketTP.index >= tanks.length) 
            this.rocketTP.index = 0;
        
        this.rocketTP.target = utils.getTankId(tanks[this.rocketTP.index]);
        this.rocketTP.index++;
    }

    isTeleportToTarget = () => {
        return this.#config.shellsTeleportData.state && this.rocketTP.teleportToTarget;
    }

    process = (strikerComponent, strikerServer, turret, turretServer,
                strikerShells, weaponTrigger, strikerLocking, sender) => 
    {
        if (!strikerComponent   || 
            !strikerServer      || 
            !turret             || 
            !turretServer       || 
            !strikerShells      || 
            !weaponTrigger      ||
            !strikerLocking     ||
            !sender)            return;

        this.shellsTeleport(strikerComponent, strikerShells);
        this.aimBot(sender.tankPhysicsComponent_0, weaponTrigger, turret);

        const strikerConfig = config.data.weaponData.strikerData;

        utils.isBindPressed(strikerConfig.nextTargetData) && this.nextTarget();

        utils.isBindPressed(strikerConfig.getTargetForAimWithScope) && 
            (strikerConfig.getTargetForAimWithScope.state = !strikerConfig.getTargetForAimWithScope.state);

        utils.isBindPressed(strikerConfig.getTargetForTPWithScope) && 
            (strikerConfig.getTargetForTPWithScope.state = !strikerConfig.getTargetForTPWithScope.state);

        if (this.#initialized)
            return;

        const targetingSystem = strikerComponent.targetingSystem_0?.targetingSystem_vutpoz$_0,
            sectorsCalculator = targetingSystem?.directionCalculator_0?.targetingSectorsCalculator_0;

        if (!sectorsCalculator)
            return;

        sectorsCalculator.maxElevationAngle_0 = Infinity;//修改射击角度大
        sectorsCalculator.minElevationAngle_0 = -Infinity;//修改射击角度小

        strikerComponent.singleShot = strikerComponent.doSingleShot;//单发导弹
        strikerComponent.shootGuidedRocket = strikerComponent.shootGuidedRocket_70obpu$;//齐射导弹

        strikerComponent.doSingleShot = function () {
            const teleportToTarget = striker.isTeleportToTarget();

            teleportToTarget ? (sync.forceSkip = true) : (sync.skip = true);
            this.singleShot();
            teleportToTarget ? (sync.forceSkip = false) : (sync.skip = false);
        }

        strikerComponent.shootGuidedRocket_70obpu$ = function (t, e) {
            const teleportToTarget = striker.isTeleportToTarget();

            teleportToTarget ? (sync.forceSkip = true) : (sync.skip = true);
            this.shootGuidedRocket(t, e);
            teleportToTarget ? (sync.forceSkip = false) : (sync.skip = false);
        }//可疑的地方，有同步

        turretServer.sendUpdate_0 = function (t) {
            if (t !== true)
                return;

            this.saveTurretState_0();

            if (this.lastDirection && +this.lastDirection.toFixed(2) === +this.lastSentState_0.direction.toFixed(2))
                return;

            this.lastSentState_0.rotationSpeedNumber = 0;
            this.lastDirection = this.lastSentState_0.direction;
            this.serverInterface_0.update_79f0ox$(this.world.physicsTime, this.tankComponent_0.incarnationId,
                this.lastSentState_0);
        }//服务器发包

        strikerComponent.__proto__.lockTarget_gcez93$ = function (t, e) {
            if (striker.#config.getTargetForAimWithScope.state && e) striker.aimBotTarget      = e;
            if (striker.#config.getTargetForTPWithScope.state  && e) striker.rocketTP.target    = e;

            sync.skip = true;
            turretServer.sendUpdate_0(true);
            let result = this.lockTarget_gcez93$$default(t, e);
            sync.skip = false;

            striker.#config.aimBotData.state && striker.aimBotTarget && 
                utils.isBindPressed(striker.#config.aimBotData) !== true && 
                (t.targetId = striker.aimBotTarget);
            
            return result || false;
        }

        strikerServer.__proto__.createShell_0 = function (t) {
            if (striker.#config.shellsTeleportData.state) {
                const target = utils.getTankById(striker.rocketTP.target),
                    targetState = target?.['TankPhysicsComponent']?.body?.state;

                if (!targetState) 
                    return strikerComponent.explodeRockets();
                    
                t.direction.init_y2kzbl$(0, 0, 0);

                if (striker.rocketTP.teleportToTarget) {
                    const state = sender.tankPhysicsComponent_0.getInterpolatedBodyState();

                    state.position.x = targetState.position.x;
                    state.position.y = targetState.position.y;
                    state.position.z = targetState.position.z + 100;

                    sync.sendUpdate(sender, state);
                }
            }

            turretServer.sendUpdate_0(true);
            this.shellCommunicationServer_0.tryToShoot_595qrd$(this.world.physicsTime, 0, t.shellId, t.direction);
        }

        strikerServer.__proto__.createGuidedRocket_0 = strikerServer.__proto__.createShell_0;

        this.#initialized = true;
    }
}