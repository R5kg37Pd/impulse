import Utils from './Shared/utils.js';
import GameObjects from './Game/gameObjects.js'
import StoreOpener from './Game/features/storeOpener.js';
import Config from './Shared/config.js';
import RemoveMines from './Game/features/cheats/removeMines.js';
import AirBreak from './Game/features/cheats/airBreak.js';
import Camera from './Game/features/cheats/camera.js';
import Menu from './Menu/menu.js';
import * as CustomImGui from './Shared/customImGui.js';
import Other from './Game/features/cheats/other.js';
import Stick from './Game/features/cheats/stick.js';
import Clicker from './Game/features/cheats/clicker.js';
import Sync from './Game/features/cheats/sync.js';
import ConsoleLog from './Game/features/consoleLog.js';
import WallHack from './Game/features/cheats/wallhack.js';
import Filters from './Game/features/filters.js';
import PacketControl from './Game/features/packetControl.js';
import Striker from './Game/features/cheats/striker.js';


export const utils          = unsafeWindow.utils          = new Utils;
export const gameObjects    = unsafeWindow.gameObjects    = new GameObjects;
export const storeOpener    = unsafeWindow.storeOpener    = new StoreOpener;
export const config         = unsafeWindow.config         = new Config;
export const removeMines    = unsafeWindow.removeMines    = new RemoveMines;
export const airBreak       = unsafeWindow.airBreak       = new AirBreak;
export const cameraHack     = unsafeWindow.cameraHack     = new Camera;
export const menu           = unsafeWindow.menu           = new Menu;
export const cImGui         = unsafeWindow.cImGui         = CustomImGui;
export const other          = unsafeWindow.other          = new Other;
export const stick          = unsafeWindow.stick          = new Stick;
export const clicker        = unsafeWindow.clicker        = new Clicker;
export const sync           = unsafeWindow.sync           = new Sync;
export const consoleLog     = unsafeWindow.consoleLog     = new ConsoleLog;
export const wallhack       = unsafeWindow.wallhack       = new WallHack;
export const filters        = unsafeWindow.filters        = new Filters;
export const packetControl  = unsafeWindow.packetControl  = new PacketControl;
export const striker        = unsafeWindow.striker        = new Striker;

const __filename = 'E:\impulse-main\src\index.js';

const resets = () => {
    airBreak.reset();
    cameraHack.reset();
    stick.reset();
    removeMines.reset();
    clicker.reset();
    sync.reset();
    consoleLog.reset();
    striker.reset();
}
/*
if (!document.URL.includes('test-eu.tankionline.com')) {
    alert('这个作弊仅支持测试服！');
    throw new Error('stop');
}

if (GM_info.script.version !== pjson.version) {
    alert('你安装了一个不正确的版本!');
    throw new Error('stop');
}
*/
(function main() {
    requestAnimationFrame(main);

    const root                  = gameObjects.root,
        gameMode                = gameObjects.gameMode,
        tank                    = gameObjects.localTank,
        tankPhysics             = tank?.['TankPhysicsComponent'],
        camera                  = tank?.['FollowCamera'],
        cameraController        = tank?.['FollowCameraHeightController'],
        chassis                 = tank?.['TrackedChassis'],
        mines                   = gameMode?.['MinesOnFieldComponent'],
        supplies                = tank?.['SuppliesHudComponent']?.supplyTypeConfigs_0,
        health                  = tank?.['HealthComponent'],
        sender                  = tank?.['LocalTankStateServerSenderComponent'],
        chat                    = gameMode?.['BattleChatComponent'],
        speed                   = tank?.['SpeedCharacteristicsComponent'],
        action                  = gameMode?.['TankActionLogComponent'],
        chassisServer           = tank?.['LocalTrackedChassisServerSenderComponent'],
        strikerComponent        = tank?.['StrikerWeapon'],
        strikerServer           = tank?.['LocalStrikerComponent'],
        turret                  = tank?.['TurretComponent'],
        turretServer            = tank?.['LocalTurretStateUpdater'],
        strikerShells           = tank?.['StrikerRocketFactory'],
        weaponTrigger           = tank?.['WeaponTrigger'],
        strikerLocking          = tank?.['LocalLockingComponent']?.lockingServerInterface_0;

    if (!root)
        return utils.debug(__filename, 90, 'main', 'root === undefined (expected object)');

    storeOpener.openStore(root);

    if (!root.state?.battleStatistics?.inBattle())
        return gameObjects.reset(), resets();

    removeMines.process(mines);
    other.process(tankPhysics, health, speed, weaponTrigger);
    consoleLog.process(chat, action);
    wallhack.process();
    filters.process();

    if (!tank || !utils.isArrayValid(tank['originalArray']))
        return resets();

    airBreak.process(tankPhysics, camera, chassis, sender);
    cameraHack.process(camera, cameraController);
    stick.process(tankPhysics);
    clicker.process(supplies);
    sync.process(sender, chassisServer, root);
    striker.process(strikerComponent, strikerServer, turret, turretServer, 
        strikerShells, weaponTrigger, strikerLocking, sender);
})();