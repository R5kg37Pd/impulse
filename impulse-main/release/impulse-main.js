(() => {
    "use strict";
    var e = {
        462: (e, t, a) => {
            a.d(t, {
                Z: () => n
            });
            var i = a(75),
                s = a(227);
            const o = "src/Game/features/cheats/airBreak.js";
            class n {
                #e = s.vc.data.airBreakData;
                #t = !1;
                #a = {
                    x: 0,
                    y: 0,
                    z: 0
                };
                #i = !1;
                get state() {
                    return this.#t
                }
                clearVelocity = e => {
                    const t = s.P6.match(e.state.velocity, "init_")?.[0],
                        a = s.P6.match(e.state.angularVelocity, "init_")?.[0];
                    if ("function" != typeof t || "function" != typeof a) return s.P6.debug(o, 20, "AirBreak::clearVelocity", `velocityInit (expected function, type: ${typeof t}) or angularVelocityInit (expected function, type ${typeof a}) invalid`);
                    t(), a()
                };
                setAirBreakPosition = e => {
                    if (this.#e.killZoneData.state) {
                        let t = s.P6.isNotKillZone(e);
                        t !== i.W.None && s.P6.outKillZone(e, t)
                    }
                    e.x && 0 !== e.x && (this.#a.x = e.x), e.y && 0 !== e.y && (this.#a.y = e.y), e.z && 0 !== e.z && (this.#a.z = e.z)
                };
                onAirBreakActivated = e => {
                    this.setAirBreakPosition(e.body.state.position)
                };
                onAirBreakDeactivated = e => {
                    this.clearVelocity(e.body), e.body.movable = !0
                };
                toggleState = e => {
                    (this.#t = !this.#t) ? this.onAirBreakActivated(e) : this.onAirBreakDeactivated(e)
                };
                setRayLenght = (e, t) => {
                    if (!e) return s.P6.debug(o, 52, "AirBreak::setRayLenght", "chassis (expected TrackedChassis) invalid");
                    e.params_0.maxRayLength = t
                };
                align = (e, t) => {
                    switch (t) {
                        case "noob":
                            e.state.angularVelocity.z = 0, e.state.velocity.x = 0, e.state.velocity.y = 0, e.state.orientation.fromEulerAngles_y2kzbl$(0, this.#e.flip ? Math.PI : 0, 0);
                            break;
                        case 0:
                            e.state.velocity.z = 0, e.state.angularVelocity.x = 0, e.state.angularVelocity.y = 0, e.state.orientation.x = 0, e.state.orientation.y = 0;
                            break;
                        default:
                            e.state.angularVelocity.z = 0, e.state.velocity.x = 0, e.state.velocity.y = 0, e.state.orientation.fromEulerAngles_y2kzbl$(this.#e.tilt ? this.#e.flip ? t.pathPosition : -t.pathPosition : 0, this.#e.flip ? Math.PI : 0, t.currState_0.direction)
                    }
                };
                alignTank = (e, t) => {
                    switch (this.#e.typeData.state) {
                        case "airWalk":
                            this.align(e.body, 0);
                            break;
                        case "default":
                            this.align(e.body, t);
                            break;
                        case "noob":
                            this.align(e.body, "noob")
                    }
                };
                setSmoothPosition = (e, t, a) => {
                    "default" !== this.#e.typeData.state && "noob" !== this.#e.typeData.state || (e.x += (t.x - e.x) / a, e.y += (t.y - e.y) / a), e.z += (t.z - e.z) / a
                };
                setPosition = e => {
                    this.setSmoothPosition(e.body.state.position, this.#a, this.#e.smoothData.state)
                };
                getSpeed = e => {
                    switch (e) {
                        case "forward":
                        case "right":
                        case "up":
                            return this.#e.speedData.state;
                        default:
                            return -this.#e.speedData.state
                    }
                };
                getRadian = (e, t) => {
                    switch (e) {
                        case "forward":
                        case "back":
                            return -t;
                        case "left":
                        case "right":
                            return -(t - Math.PI / 2)
                    }
                    return 0
                };
                onMoved = (e, t = 0) => {
                    let a = this.getSpeed(e),
                        i = this.getRadian(e, t),
                        s = {
                            x: 0,
                            y: 0,
                            z: 0
                        };
                    switch (e) {
                        case "forward":
                        case "back":
                        case "left":
                        case "right":
                            switch (this.#e.typeData.state) {
                                case "default":
                                    s.x = this.#a.x + a * Math.sin(i), s.y = this.#a.y + a * Math.cos(i);
                                    break;
                                case "noob":
                                    "left" !== e && "right" !== e || (s.x = this.#a.x + a), "forward" !== e && "back" !== e || (s.y = this.#a.y + a)
                            }
                            break;
                        default:
                            s.z = this.#a.z + a
                    }
                    this.setAirBreakPosition(s)
                };
                keyHandler = e => {
                    let t;
                    switch (t = this.#e.speedData, s.P6.isBindPressed(t.inc) && (t.state += 10, t.state > 1e3 && (t.state = 1e3)), s.P6.isBindPressed(t.dec) && (t.state -= 10, t.state < 10 && (t.state = 10)), t = this.#e.smoothData, s.P6.isBindPressed(t.inc) && (t.state += 1, t.state > 100 && (t.state = 100)), s.P6.isBindPressed(t.dec) && (t.state -= 1, t.state < 1 && (t.state = 1)), t = this.#e.killZoneData, s.P6.isBindPressed(t) && (t.state = !t.state), t = this.#e.typeData, s.P6.isBindPressed(t.default) && (t.state = "default"), s.P6.isBindPressed(t.simple) && (t.state = "noob"), s.P6.isBindPressed(t.airWalk) && (t.state = "airWalk"), t = this.#e.movementData, this.#e.typeData.state) {
                        case "noob":
                            s.P6.isBindPressed(t.up) && this.onMoved("up"), s.P6.isBindPressed(t.down) && this.onMoved("down"), s.P6.isBindPressed(t.forward) && this.onMoved("forward"), s.P6.isBindPressed(t.back) && this.onMoved("back"), s.P6.isBindPressed(t.left) && this.onMoved("left"), s.P6.isBindPressed(t.right) && this.onMoved("right");
                            break;
                        case "default":
                            s.P6.isBindPressed(t.forward) && this.onMoved("forward", e), s.P6.isBindPressed(t.back) && this.onMoved("back", e), s.P6.isBindPressed(t.left) && this.onMoved("left", e), s.P6.isBindPressed(t.right) && this.onMoved("right", e);
                        case "airWalk":
                            s.P6.isBindPressed(t.up) && this.onMoved("up"), s.P6.isBindPressed(t.down) && this.onMoved("down")
                    }
                };
                reset = () => {
                    this.#t = !1, this.#i = !1
                };
                process = (e, t, a, i) => {
                    if (this.#i) return;
                    if (!e || !t) return s.P6.debug(o, 235, "AirBreak::process", `physics (expected TankPhysicsComponent, type: ${typeof e}) or camera (expected FollowCamera, type: ${typeof t}) invalid`);
                    this.#i = !0;
                    const n = s.P6.match(i, "runAfterPhysicsUpdate_", "function", !0);
                    n ? i[n] = () => {
                        if (s.P6.isBindPressed(this.#e.toggleStateData) && this.toggleState(e), !0 !== this.#t) return this.setRayLenght(a, 50);
                        this.keyHandler(t.currState_0.direction), this.alignTank(e, t), this.setPosition(e), e.body.movable = "airWalk" === this.#e.typeData.state, "airWalk" === this.#e.typeData.state && this.setRayLenght(a, 1e100)
                    } : s.P6.debug(o, 240, "AirBreak::process", "runAfterPhysicsUpdate (expected string) invalid")
                }
            }
        },
        38: (e, t, a) => {
            a.d(t, {
                Z: () => s
            });
            var i = a(227);
            class s {
                #s = 1500;
                #o = 0;
                #i = !1;
                #n;
                #r = !1;
                #c;
                #e = i.vc.data.cameraData;
                reset = () => {
                    this.#i = !1, this.#n = void 0, this.#c = void 0
                };
                spectate = e => {
                    this.#n = e
                };
                deactivate = () => {
                    this.#n = void 0
                };
                distance = () => {
                    this.#e.state && (this.#s += 1e3, this.#s > 2500 && (this.#s = 500))
                };
                nextTarget = () => {
                    let e = i.P6.getTanks();
                    i.P6.isArrayValid(e) && (this.#o >= e.length && (this.#o = 0), this.#n = e[this.#o], this.#o++)
                };
                process = (e, t) => {
                    let a = i.vc.data.spectateData;
                    if (i.P6.isBindPressed(this.#e) && this.distance(), i.P6.isBindPressed(a.deactivateData) && this.deactivate(), i.P6.isBindPressed(a.nextTargetData) && this.nextTarget(), !this.#i) {
                        if (!e || !t) return i.P6.debug("src/Game/features/cheats/camera.js", 58, "Camera::process", `controller (expected FollowCameraHeightController, type: ${typeof t}) or camera (expected FollowCamera, type: ${typeof e}) invalid`);
                        this.#c = e, e.polarDistance_0.copy = e.polarDistance_0.update_dleff0$, e.pitch_0.copy = e.pitch_0.update_dleff0$, e.elevation_0.copy = e.elevation_0.update_dleff0$, e.pivot_0.copy = e.pivot_0.update_sl07mc$, Object.defineProperty(e, "pathPosition", {
                            get: function () {
                                return this.pathPosition_dl3fsr$_0
                            },
                            set: function (e) {
                                let t = s(e, -Math.PI / 2, Math.PI / 2);
                                this.pathPointElevation_0 = this.pathPosition_dl3fsr$_0 = t, this.pathPositionOffset_0 = s(this.pathPositionOffset_0, -t, 1 - t), this.updatePathPoint_0()
                            },
                            enumerable: !0,
                            configurable: !0
                        }), e.getCollisionTime_0 = function () {
                            return 1
                        }, e.polarDistance_0.update_dleff0$ = function (e, t) {
                            if (!1 === i.$l.#e.state || !document.pointerLockElement) return this.copy(e, t);
                            this.value += (i.$l.#s - this.value) / 20
                        }, e.pitch_0.update_dleff0$ = function (t, a) {
                            if (!1 === i.$l.#e.state || !document.pointerLockElement) return this.copy(t, a);
                            this.value = e.pathPosition
                        }, e.elevation_0.update_dleff0$ = function (t, a) {
                            if (!1 === i.$l.#e.state || !document.pointerLockElement) return this.copy(t, a);
                            this.value = e.pathPosition + .2
                        }, e.pivot_0.update_sl07mc$ = function (e, t) {
                            let a = i.$l.#n?.TankPhysicsComponent?.body;
                            this.copy(e, a ? a.state.position : t)
                        }, t.cameraDown_0 = function (e) {
                            if (i.Ri.state && i.P6.isBindPressed(i.vc.data.airBreakData.movementData.down) || i.$l.#e.state && document.pointerLockElement) return this.down_0 = !1;
                            this.down_0 = e.isPressed
                        }, t.cameraUp_0 = function (e) {
                            if (i.Ri.state && i.P6.isBindPressed(i.vc.data.airBreakData.movementData.up) || i.$l.#e.state && document.pointerLockElement) return this.up_0 = !1;
                            this.up_0 = e.isPressed
                        }, !0 !== this.#r && (document.addEventListener("mousemove", (e => {
                            !1 !== this.#e.state && this.#c && document.pointerLockElement && (this.#c.pathPosition += 525e-6 * e.movementY)
                        }), !1), this.#r = !0), this.#i = !0
                    }

                    function s(e, t, a) {
                        return e < t ? t : e > a ? a : e
                    }
                }
            }
        },
        24: (e, t, a) => {
            a.d(t, {
                Z: () => s
            });
            var i = a(227);
            class s {
                #e = i.vc.data.clickerData;
                #l;
                temp = !1;
                constructor() {
                    setInterval(this.suppliesLowPriority, 300), setInterval(this.suppliesHighPriority, 0)
                }
                reset = () => {
                    this.temp = !1, this.#l = void 0
                };
                getSupplyByName = e => this.#l.get_11rb$(this.#l.head_1lr44l$_0?.key.constructor[e]);
                activateSupply = (e, t, a = 30) => {
                    if (t) {
                        let t = Array.from(i.UJ.world?.inputManager?.input?.gameActions_0?.map);
                        if (!i.P6.isArrayValid(t)) return;
                        for (const a of t)
                            if (a[0].name === e) return a[1].wasPressed = !0, void (a[1].wasReleased = !0)
                    }
                    const s = i.UJ.localTank?.TankComponent?.state;
                    "ACTIVE" === s?.name && i.oQ.responseTime <= a && this.getSupplyByName(e)?.onUserActivatedSupply()
                };
                suppliesHighPriority = () => {
                    if (this.#l) {
                        if (this.#e.autoHealingData.state || !1 !== this.temp)
                            for (let e = 0; e < this.#e.autoHealingData.multiply; e++) this.activateSupply("FIRST_AID", !1, this.#e.autoHealingData.delay);
                        if (this.#e.autoMiningData.state || !1 !== this.temp)
                            for (let e = 0; e < this.#e.autoMiningData.multiply; e++) this.activateSupply("MINE", !1, this.#e.autoMiningData.delay)
                    }
                };
                suppliesLowPriority = () => {
                    this.#l && (this.#e.autoArmorData.state && this.activateSupply("USE_DOUBLE_ARMOR", !0), this.#e.autoDamageData.state && this.activateSupply("USE_DOUBLE_DAMAGE", !0), this.#e.autoNitroData.state && this.activateSupply("USE_NITRO", !0))
                };
                process = e => {
                    i.P6.isBindPressed(this.#e.autoHealingData) && (this.#e.autoHealingData.state = !this.#e.autoHealingData.state), i.P6.isBindPressed(this.#e.autoArmorData) && (this.#e.autoArmorData.state = !this.#e.autoArmorData.state), i.P6.isBindPressed(this.#e.autoDamageData) && (this.#e.autoDamageData.state = !this.#e.autoDamageData.state), i.P6.isBindPressed(this.#e.autoNitroData) && (this.#e.autoNitroData.state = !this.#e.autoNitroData.state), i.P6.isBindPressed(this.#e.autoMiningData) && (this.#e.autoMiningData.state = !this.#e.autoMiningData.state), e && (this.#l = e)
                }
            }
        },
        551: (e, t, a) => {
            a.d(t, {
                Z: () => s
            });
            var i = a(227);
            class s {
                #d = !1;
                #e = i.vc.data.otherData;
                speedHack = e => {
                    e && (this.#e.speedHack ? e.currentValue = 1e100 : e.currentValue = e.targetValue)
                };
                autoLowHPClicker = e => {
                    !1 !== this.#e.autoHealingClicker && e && (e.health !== e.maxHealth && 0 !== e.health ? i.RB.temp = !0 : !1 === this.#d && (i.RB.temp = !1))
                };
                autoMammothClicker = e => {
                    if (!this.#e.autoHealingClicker) return;
                    let t = e.MammothUltimateEffectComponent,
                        a = e.UltimatePreparationEffectComponent;
                    t && a && ("function" != typeof t.copy ? (t.copy = t.stopEffect_0, t.stopEffect_0 = function (e) {
                        return i.RB.temp = !1, i.YH.#d = !1, this.copy(e)
                    }) : a.tickEnabled && (i.RB.temp = !0, this.#d = !0))
                };
                freezeTank = e => {
                    let t = e.TankPhysicsComponent?.body;
                    t && (this.#e.freezeTanks ? (t.state.velocity.init_y2kzbl$(), t.state.angularVelocity.init_y2kzbl$(), t.movable = !1) : t.movable || (t.movable = !0))
                };
                bodyParser = () => {
                    let e = i.P6.getTanks();
                    if (i.P6.isArrayValid(e))
                        for (const t of e) this.freezeTank(t), i.P6.isTankEnemy(t) && this.autoMammothClicker(t)
                };
                noCollision = e => {
                    e && (this.#e.noCollision ? e.setDeadPhantomState_0() : e.setFullyInteractableState_0())
                };
                autoShot = e => {
                    e && this.#e.autoShot && (e.pulled_0 = !0)
                };
                process = (e, t, a, i) => {
                    this.bodyParser(), this.noCollision(e), this.autoLowHPClicker(t), this.speedHack(a?.maxSpeedSmoohter_0?.smoother), this.autoShot(i)
                }
            }
        },
        956: (e, t, a) => {
            a.d(t, {
                Z: () => s
            });
            var i = a(227);
            class s {
                #m;
                #e = i.vc.data.removeMinesData;
                constructor() {
                    setInterval(this.removeMines, 0)
                }
                reset = () => {
                    this.#m = void 0
                };
                removeMines = () => {
                    if (this.#e.state && this.#m && void 0 !== this.#m?.minesByUser_0?.keys)
                        for (let e = this.#m.minesByUser_0.keys.iterator(); e.hasNext();) {
                            let t = e.next();
                            "TEAM" === this.#e.type && i.P6.isTankEnemy(i.P6.getTankById(t)) || this.#m.removeAllMines_0(t)
                        }
                };
                process = e => e && (this.#m = e)
            }
        },
        867: (e, t, a) => {
            a.d(t, {
                Z: () => s
            });
            var i = a(227);
            class s {
                #u;
                #s = 500;
                #o = 0;
                #e = i.vc.data.stickData;
                reset = () => {
                    this.#u = void 0, this.#s = 500
                };
                stick = e => {
                    this.#u = e
                };
                keyHandler = () => {
                    i.P6.getKeyState("KeyW") && (this.#s -= 10), i.P6.getKeyState("KeyS") && (this.#s += 10), this.#s > 3e3 && (this.#s = 3e3), this.#s < -3e3 && (this.#s = -3e3)
                };
                nextTarget = () => {
                    let e = i.P6.getTanks();
                    i.P6.isArrayValid(e) && (this.#o >= e.length && (this.#o = 0), this.#u = e[this.#o], this.#o++)
                };
                process = e => {
                    if (i.P6.isBindPressed(this.#e.deactivateData) && (this.#u = void 0), i.P6.isBindPressed(this.#e.nextTargetData) && this.nextTarget(), !this.#u || !e) return;
                    let t = e.body?.state,
                        a = this.#u.TankPhysicsComponent?.body?.state;
                    if (!t || !a) return;
                    let s = {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                        o = (a.orientation.getYAxis_ry1qwf$(s), Math.atan2(s.y, s.x));
                    t.position.init_ry1qwf$({
                        x: a.position.x - this.#s * Math.sin(-(o - Math.PI / 2)),
                        y: a.position.y - this.#s * Math.cos(-(o - Math.PI / 2)),
                        z: a.position.z + this.#s
                    }), t.orientation.init_nq7ezj$(a.orientation), t.velocity.init_y2kzbl$(), t.angularVelocity.init_y2kzbl$(), this.keyHandler()
                }
            }
        },
        125: (e, t, a) => {
            a.d(t, {
                Z: () => s
            });
            var i = a(227);
            class s {
                #i = !1;
                #aimBotTarget = void 0;
                #e = i.vc.data.weaponData.strikerData;
                rocketTP = {
                    target: void 0,
                    state: !1,
                    timeout: void 0,
                    teleportToTarget: !1,
                    index: 0
                };
                reset = () => {
                    this.#i = !1, this.aimBotTarget = void 0, this.rocketTP = {
                        target: void 0,
                        state: !1,
                        timeout: void 0,
                        teleportToTarget: !1,
                        index: 0
                    }
                };
                shellsTeleport = (e, t) => {
                    const a = this.#e.shellsTeleportData,//潜在的错误
                        s = t.shellCache_0?.itemsInUse?.toArray();
                    if (!i.P6.isArrayValid(s)) return;
                    for (const e of s) {
                        if (void 0 !== e.components && i.P6.isArrayValid(e.components?.originalArray) || (e.components = i.P6.getComponentNames(e.components_0.array)), !e.components) continue;
                        a.state && e.components.StrikerRocket?.direction?.init_y2kzbl$(0, 0, 0);
                        const t = e.components.StrikerRocketComponent;
                        t && (t.staticHit_0 = () => { }, t.selfDestruct_0 = () => { })
                    }
                    if (!a.state || !this.rocketTP.target) return;
                    const o = i.P6.getTankById(this.rocketTP.target)?.TankPhysicsComponent?.body?.state;
                    if (o) {
                        if (!0 !== this.rocketTP.state && s.length === e.salvoRocketsCount && !this.rocketTP.timeout) {
                            const e = s.at(-1).components,
                                t = e?.RaycastShell?.barrelOrigin.distance_ry1qwf$(o.position);
                            this.rocketTP.teleportToTarget ? this.rocketTP.timeout = setTimeout((() => {
                                this.rocketTP.state = !0, this.rocketTP.timeout = void 0
                            }), 2e3) : e?.StrikerRocket?.distance_0 >= t && (this.rocketTP.state = !0)
                        }
                        if (i.P6.isBindPressed(a) && (this.rocketTP.state = !0), this.rocketTP.state) {
                            this.rocketTP.timeout && (clearTimeout(this.rocketTP.timeout), this.rocketTP.timeout = void 0), this.rocketTP.state = !1;
                            for (const e of s) {
                                const t = e.components.StrikerRocketComponent;
                                t.shellStates_0.lastKnownState_0.position.init_ry1qwf$(o.position), t.serverInterface_0.tryToHit_nn87qu$(t.world.physicsTime, t.raycastShell_0.shellId, t.shellStates_0)
                            }
                            for (let t = 0; t < e.salvoRocketsCount; t++) e.explodeRockets()
                        }
                    }
                };
                aimBot = (e, t, a) => {
                    const s = this.#e.aimBotData;
                    if (!s.state || !t.pulled_0 || i.P6.isBindPressed(s)) return;
                    const o = i.P6.getTankById(this.aimBotTarget)?.TankPhysicsComponent?.body?.state;
                    if (!o) return;
                    const n = e.body.state.position,
                        r = o.position;
                    a.direction = a.getLocalDirectionFromWorldDirection_0(Math.atan2(r.y - n.y, r.x - n.x) - Math.PI / 2)
                };
                nextTarget = () => {
                    const e = i.P6.getTanks();
                    i.P6.isArrayValid(e) && (this.rocketTP.index >= e.length && (this.rocketTP.index = 0), this.rocketTP.target = i.P6.getTankId(e[this.rocketTP.index]), this.rocketTP.index++)
                };
                isTeleportToTarget = () => this.#e.shellsTeleportData.state && this.rocketTP.teleportToTarget;
                process = (e, t, a, s, o, n, r, c) => {
                    if (!(e && t && a && s && o && n && r && c)) return;
                    this.shellsTeleport(e, o), this.aimBot(c.tankPhysicsComponent_0, n, a);
                    const l = i.vc.data.weaponData.strikerData;
                    if (i.P6.isBindPressed(l.nextTargetData) && this.nextTarget(), i.P6.isBindPressed(l.getTargetForAimWithScope) && (l.getTargetForAimWithScope.state = !l.getTargetForAimWithScope.state), i.P6.isBindPressed(l.getTargetForTPWithScope) && (l.getTargetForTPWithScope.state = !l.getTargetForTPWithScope.state), this.#i) return;
                    const d = e.targetingSystem_0?.targetingSystem_vutpoz$_0,
                        m = d?.directionCalculator_0?.targetingSectorsCalculator_0;
                    m && (m.maxElevationAngle_0 = 1 / 0, m.minElevationAngle_0 = -1 / 0, e.singleShot = e.doSingleShot, e.shootGuidedRocket = e.shootGuidedRocket_70obpu$, e.doSingleShot = function () {
                        const e = i.vR.isTeleportToTarget();
                        e ? i.Z_.forceSkip = !0 : i.Z_.skip = !0, this.singleShot(), e ? i.Z_.forceSkip = !1 : i.Z_.skip = !1
                    }, e.shootGuidedRocket_70obpu$ = function (e, t) {
                        const a = i.vR.isTeleportToTarget();
                        a ? i.Z_.forceSkip = !0 : i.Z_.skip = !0, this.shootGuidedRocket(e, t), a ? i.Z_.forceSkip = !1 : i.Z_.skip = !1
                    }, s.sendUpdate_0 = function (e) {
                        !0 === e && (this.saveTurretState_0(), this.lastDirection && +this.lastDirection.toFixed(2) == +this.lastSentState_0.direction.toFixed(2) || (this.lastSentState_0.rotationSpeedNumber = 0, this.lastDirection = this.lastSentState_0.direction, this.serverInterface_0.update_79f0ox$(this.world.physicsTime, this.tankComponent_0.incarnationId, this.lastSentState_0)))
                    }, e.__proto__.lockTarget_gcez93$ = function (e, t) {
                        i.vR.#e.getTargetForAimWithScope.state && t && (i.vR.aimBotTarget = t), i.vR.#e.getTargetForTPWithScope.state && t && (i.vR.rocketTP.target = t), i.Z_.skip = !0, s.sendUpdate_0(!0);
                        let a = this.lockTarget_gcez93$$default(e, t);
                        return i.Z_.skip = !1, i.vR.#e.aimBotData.state && i.vR.aimBotTarget && !0 !== i.P6.isBindPressed(i.vR.#e.aimBotData) && (e.targetId = i.vR.aimBotTarget), a || !1
                    }, t.__proto__.createShell_0 = function (t) {
                        if (i.vR.#e.shellsTeleportData.state) {
                            const a = i.P6.getTankById(i.vR.rocketTP.target)?.TankPhysicsComponent?.body?.state;
                            if (!a) return e.explodeRockets();
                            if (t.direction.init_y2kzbl$(0, 0, 0), i.vR.rocketTP.teleportToTarget) {
                                const e = c.tankPhysicsComponent_0.getInterpolatedBodyState();
                                e.position.x = a.position.x, e.position.y = a.position.y, e.position.z = a.position.z + 100, i.Z_.sendUpdate(c, e)
                            }
                        }
                        s.sendUpdate_0(!0), this.shellCommunicationServer_0.tryToShoot_595qrd$(this.world.physicsTime, 0, t.shellId, t.direction)
                    }, t.__proto__.createGuidedRocket_0 = t.__proto__.createShell_0, this.#i = !0)
                }
            }
        },
        272: (e, t, a) => {
            a.d(t, {
                Z: () => o
            });
            var i = a(227);
            const s = "src/Game/features/cheats/sync.js";
            class o {
                #i = !1;
                #h = {
                    position: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    orientation: {
                        x: 0,
                        y: 0,
                        z: 0,
                        w: 0
                    }
                };
                #p = 0;
                #g = void 0;
                #e = i.vc.data.syncData;
                skip = !1;
                forceSkip = !1;
                isRandomTPEnabled = !1;
                reset = () => {
                    this.forceSkip = !1, this.skip = !1, this.#i = !1, this.#p = 0, clearInterval(this.#g)
                };
                compareOrientation = e => +e.orientation.x.toFixed(2) == +this.#h.orientation.x.toFixed(2) && +e.orientation.y.toFixed(2) == +this.#h.orientation.y.toFixed(2) && +e.orientation.z.toFixed(2) == +this.#h.orientation.z.toFixed(2) && +e.orientation.w.toFixed(2) == +this.#h.orientation.w.toFixed(2);
                isRocketsExist = e => {
                    let t = i.P6.getTanks(e),
                        a = !1;
                    if (i.P6.isArrayValid(t)) {
                        for (const e of t) {
                            let t = e.StrikerRocketFactory?.shellCache_0?.itemsInUse?.toArray();
                            if (i.P6.isArrayValid(t)) {
                                for (const e of t) i.P6.match(e.components_0.array[1].direction, "init_")?.[0](0, 0, 0);
                                a = !0
                            }
                        }
                        return a
                    }
                };
                sendUpdate = (e, t) => {
                    if (i.oQ.responseTime >= 2500) return;
                    const a = i.UJ.localTank?.TankComponent?.state;
                    if ("ACTIVE" === a?.name) {
                        let a = i.P6.isNotKillZone(t.position);
                        if (0 !== a && i.P6.outKillZone(t.position, a), !i.UJ.localTank.StrikerWeapon || this.skip || this.forceSkip) {
                            if (i.P6.match(t.position, "distance_")?.(this.#h.position) < 300 && this.compareOrientation(t)) return
                        } else if (i.P6.match(t.position, "distance_")?.(this.#h.position) < 300) return;
                        this.#h.position = t.position.clone(), this.#h.orientation = t.orientation.clone(), e.sendUpdate_0(t, e.world.physicsTime)
                    }
                };
                randomPosition = e => {
                    i.Z_.isRandomTPEnabled = !0;
                    let t = i.UJ.gameMode?.BattleMapComponent,
                        a = i.P6.getKillZone(t);
                    a && (e.position.x = i.P6.getUniqueRandomArbitrary(this.#h.position.x, 3e3, a.minX, a.maxX), e.position.y = i.P6.getUniqueRandomArbitrary(this.#h.position.y, 3e3, a.minY, a.maxY), e.position.z = Math.round(Math.random()) ? a.maxZ : t.bounds.maxZ + 500, e.orientation.x = 0, e.orientation.y = 0)
                };
                process = (e, t, a) => {
                    if (i.P6.isBindPressed(this.#e.antiStrikerData) && (this.#e.antiStrikerData.state = !this.#e.antiStrikerData.state), i.P6.isBindPressed(this.#e.randomTeleportData) && (this.#e.randomTeleportData.state = !this.#e.randomTeleportData.state), i.P6.isBindPressed(this.#e.antiMineData) && (this.#e.antiMineData.state = !this.#e.antiMineData.state), e && this.#i && !this.skip && !this.forceSkip && e.world.physicsTime > this.#p && (this.#p = e.world.physicsTime + this.#e.updateInterval, e.sendState_0(e.tankPhysicsComponent_0.getInterpolatedBodyState())), !this.#i) {
                        if (!e || !t) return i.P6.debug(s, 122, "Sync::process", "sender (expected LocalTankStateServerSenderComponent) invalid");
                        this.#i = !0, setInterval(function () {
                            a.state.battlePauseState.idleKickPeriodInMsec.low_ = 12e6;
                            const e = i.P6.match(this.serverInterface_0, "sendChassisControl_");
                            if (!e) return i.P6.debug(s, 131, "Sync::process::interval:126", "sendChassisControl (expected function) invalid");
                            this.onControlChanged_0 = () => { }, this.chassis_0.controlState.moveForward = 1, e(this.world.physicsTime, this.chassis_0.controlState), this.chassis_0.controlState.moveForward = 0, e(this.world.physicsTime, this.chassis_0.controlState)
                        }.bind(t), 3e4), e.__proto__.sendState_0 = function (e) {
                            if (!i.Z_.forceSkip) {
                                if (i.Z_.skip) return i.Z_.sendUpdate(this, e);
                                i.Z_.#e.antiMineData.state && (e.position.z += i.Z_.#e.antiMineData.height), i.Z_.isRandomTPEnabled = !1, i.Z_.#e.antiStrikerData.state && i.Z_.isRocketsExist("Enemy" === i.Z_.#e.antiStrikerData.type) && i.Z_.randomPosition(e), i.Z_.#e.randomTeleportData.state && i.Z_.randomPosition(e), i.Z_.sendUpdate(this, e)
                            }
                        }
                    }
                }
            }
        },
        842: (e, t, a) => {
            a.d(t, {
                Z: () => s
            });
            var i = a(227);
            class s {
                #e = i.vc.data.wallHackData;
                drawTankGlow = (e, t = 0) => {
                    let a = e.DetailedCollisionGeometry,
                        i = a?.weaponSkin_0?.root,
                        s = i?.children_ich852$_0?.array,
                        o = a?.weaponSkin_0?.hullSkinComponent_0?.hull,
                        n = o?.children_ich852$_0?.array;
                    if (s && n)
                        if (0 !== t) {
                            i.outlined = !0, i.outlineBold = !1, i.outlineColor = t, o.outlined = !0, o.outlineBold = !1, o.outlineColor = t;
                            for (const e of s) e.outlined = !0, e.outlineBold = !1, e.outlineColor = t;
                            for (const e of n) e.outlined = !0, e.outlineBold = !1, e.outlineColor = t
                        } else {
                            i.outlined = !1, o.outlined = !1;
                            for (const e of s) e.outlined = !1;
                            for (const e of n) e.outlined = !1
                        }
                };
                drawTankChams = (e, t = 0) => {
                    let a = e.TemperatureComponent;
                    a && 0 !== t && (a.currentTransform_0.redMultiplier = t[0] * (10 * t[3] + .001), a.currentTransform_0.greenMultiplier = t[1] * (10 * t[3] + .001), a.currentTransform_0.blueMultiplier = t[2] * (10 * t[3] + .001), a.temperature_0 = 0, a.currentTransform_0.redOffset = 0, a.currentTransform_0.greenOffset = 0, a.currentTransform_0.blueOffset = 0)
                };
                tankChamsHandler = e => {
                    if (this.#e.tankChamsData.state) return i.P6.getTankId(e) === i.vR.rocketTP.target ? this.drawTankChams(e, this.#e.tankChamsData.colorTarget) : i.P6.isTankEnemy(e) ? this.drawTankChams(e, this.#e.tankChamsData.colorEnemy) : void (this.#e.tankChamsData.onlyEnemy || this.drawTankChams(e, this.#e.tankChamsData.colorTeam))
                };
                tankGlowHandler = e => this.#e.tankGlowData.state ? i.P6.getTankId(e) === i.vR.rocketTP.target ? this.drawTankGlow(e, this.#e.tankGlowData.colorTarget.dec) : i.P6.isTankEnemy(e) ? this.drawTankGlow(e, this.#e.tankGlowData.colorEnemy.dec) : void (this.#e.tankGlowData.onlyEnemy ? this.drawTankGlow(e) : this.drawTankGlow(e, this.#e.tankGlowData.colorTeam.dec)) : this.drawTankGlow(e);
                nameDistance = e => {
                    let t = e.UserTitleComponent;
                    t && (t.currentAlpha_0 = 1)
                };
                process = () => {
                    let e = i.P6.getTanks();
                    if (i.P6.isArrayValid(e))
                        for (const t of e) this.nameDistance(t), this.tankChamsHandler(t), this.tankGlowHandler(t)
                }
            }
        },
        975: (e, t, a) => {
            a.d(t, {
                Z: () => s
            });
            var i = a(227);
            class s {
                #i = !1;
                reset = () => {
                    this.#i = !1
                };
                getClanTag = e => null === e ? "" : `[${e}] `;
                getName = e => `${this.getClanTag(e.clanTag)}${e.uid}`;
                getColor = e => "ENEMY" === e.teamRelation.name || "ALLY" !== e.teamRelation.name ? "color: #FF7C7C;" : "color: #50B6FF;";
                process = (e, t) => {
                    if (!this.#i) {
                        if (!e || !t) return i.P6.debug("src/Game/features/consoleLog.js", 30, "ConsoleLog::process", `chat (expected BattleChatComponent, type ${typeof e}) or action (expected TankActionLogComponent, type: ${typeof t}) invalid`);
                        this.#i = !0, !e.userCopy && (e.userCopy = e.onUserMessage_0), !e.teamCopy && (e.teamCopy = e.onTeamMessage_0), !t.killed && (t.killed = t.onTankKilled_0), !t.suicide && (t.suicide = t.onTankSuicide_0), !t.join && (t.join = t.onUserJoinTheBattle_0), !t.leave && (t.leave = t.onUserLeaveTheBattle_0), e.onUserMessage_0 = function (e) {
                            return console.log(`${i.P6.getTime()} - %c${i.Pr.getName(e.userLabelData)}:`, i.Pr.getColor(e.userLabelData), `${e.message}`), this.userCopy(e)
                        }, e.onTeamMessage_0 = function (e) {
                            return console.log(`${i.P6.getTime()} - %c${i.Pr.getName(e.userLabelData)}: ${e.message}`, "color: #50B6FF"), this.teamCopy(e)
                        }, t.onTankKilled_0 = function (e) {
                            let t = i.Pr.getName(e.killerUserLabelData),
                                a = i.Pr.getName(e.destroyedUserLabelData);
                            return console.log(`${i.P6.getTime()} - %c${t} %cdestroyed %c${a} %cwith an %c${e.damageType.name}`, i.Pr.getColor(e.killerUserLabelData), "", i.Pr.getColor(e.destroyedUserLabelData), "", "color: red;"), this.killed(e)
                        }, t.onTankSuicide_0 = function (e) {
                            return console.log(`${i.P6.getTime()} - %c${i.Pr.getName(e.userLabelData)}`, i.Pr.getColor(e.userLabelData), "suicide"), this.suicide(e)
                        }, t.onUserJoinTheBattle_0 = function (e) {
                            return console.log(`${i.P6.getTime()} - %c${i.Pr.getName(e.userLabelData)}`, i.Pr.getColor(e.userLabelData), "join"), this.join(e)
                        }, t.onUserLeaveTheBattle_0 = function (e) {
                            return console.log(`${i.P6.getTime()} - %c${i.Pr.getName(e.userLabelData)}`, i.Pr.getColor(e.userLabelData), "leave"), this.leave(e)
                        }
                    }
                }
            }
        },
        374: (e, t, a) => {
            a.d(t, {
                Z: () => s
            });
            var i = a(227);
            class s {
                #e = i.vc.data.filtersData;
                process = () => {
                    const e = document.querySelector("#root > div > canvas");
                    if (!e) return i.P6.debug("src/Game/features/filters.js", 11, "Filters::process", "canvas (expected HTMLCanvasElement) invalid");
                    let t = "";
                    0 !== this.#e.blur && (t += `blur(${this.#e.blur}px) `), 0 !== this.#e.brightness && (t += `brightness(${this.#e.brightness}) `), 0 !== this.#e.contrast && (t += `contrast(${this.#e.contrast}%) `), 0 !== this.#e.grayscale && (t += `grayscale(${this.#e.grayscale}%) `), 0 !== this.#e["hue-rotate"] && (t += `hue-rotate(${this.#e["hue-rotate"]}deg) `), 0 !== this.#e.invert && (t += `invert(${this.#e.invert}%) `), 0 !== this.#e.saturate && (t += `saturate(${this.#e.saturate}) `), 0 !== this.#e.sepia && (t += `sepia(${this.#e.sepia}%) `), e.style.filter = t
                }
            }
        },
        105: (e, t, a) => {
            a.d(t, {
                Z: () => o
            });
            var i = a(232),
                s = a(227);
            class o {
                packetCounter = 0;
                lastResponseTime = (new Date).getTime();
                get responseTime() {
                    return (new Date).getTime() - this.lastResponseTime
                }
            }
            setInterval((() => {
                const e = document.getElementsByClassName("sc-bwzfXH iCDncT")[0];
                if (!e || e.childElementCount < 2) return;
                if (2 === e.childElementCount) {
                    const t = document.createElement("div");
                    t.innerHTML = '<div class="sc-bwzfXH cmInNa" data-style="BattleHudFpsComponentStyle-row"><span class="sc-bxivhb fPSAir" data-style="BattleHudFpsComponentStyle-label">PPS: </span><span class="sc-bxivhb bcGHtx" data-style="BattleHudFpsComponentStyle-value" id="pps">0</span></div>', e.appendChild(t)
                }
                const t = document.getElementById("pps"),
                    a = s.oQ.packetCounter;
                a <= 10 && (t.style.color = "rgb(14, 157, 240)"), a > 10 && a < 30 && (t.style.color = "rgb(116, 186, 61)"), a >= 30 && a <= 70 && (t.style.color = "rgb(255, 188, 9)"), a > 70 && (t.style.color = "rgb(255, 82, 9)"), t.textContent = a.toString(), s.oQ.packetCounter = 0
            }), 1e3), i.Z.before = function () {
                s.oQ.packetCounter++
            }, i.Z.after = function (e, t, a) {
                return s.oQ.responseTime < 5 || (s.oQ.lastResponseTime = (new Date).getTime()), e
            }
        },
        995: (e, t, a) => {
            a.d(t, {
                Z: () => s
            });
            var i = a(227);
            class s {
                openStore = e => {
                    let t = e?.state?.shop;
                    if (!t) return i.P6.debug("src/Game/features/storeOpener.js", 9, "StoreOpener::openStore", "shop (expected Shop) invalid");
                    !t.enabled && (t.enabled = !0)
                }
            }
        },
        662: (e, t, a) => {
            a.d(t, {
                Z: () => o
            });
            var i = a(227);
            const s = "src/Game/gameObjects.js";
            class o {
                #y;
                #f;
                #k;
                #I;
                get root() {
                    if (this.#y) return this.#y;
                    const e = document.getElementById("root");
                    return e ? this.#y = e._reactRootContainer?._internalRoot?.current?.memoizedState?.element?.type?.prototype?.store : i.P6.debug(s, 17, "GameObjects::get root", "root (expected HTMLElement) invalid")
                }
                get world() {
                    return this.#f ? this.#f : this.#f = i.P6.getComponentNames(this.root?.subscribers?.toArray())?.ChassisSettingsUpdater?.tank?.world
                }
                get gameMode() {
                    return this.#k && i.P6.isArrayValid(this.#k.originalArray) ? this.#k : this.#k = i.P6.getComponentNames(this.world?.entities_0?.toArray()?.at(0)?.components_0?.array)
                }
                get localTank() {
                    if (this.#I && i.P6.isArrayValid(this.#I.originalArray)) return this.#I;
                    if (!this.gameMode) return;
                    let e = this.gameMode.originalArray[0]?.gameMode_0?.possesedTank;
                    return e ? (this.#I = i.P6.getComponentNames(e.components_0?.array), this.#I && (this.#I.entity = e), this.#I) : i.P6.debug(s, 46, "GameObjects::get localtank", "possedTank (expected BattleEntity) invalid")
                }
                reset = () => {
                    this.#k = void 0, this.#I = void 0, this.#f = void 0
                }
            }
        },
        487: (e, t, a) => {
            a.d(t, {
                Z: () => s
            });
            var i = a(227);
            class s {
                #B = 0;
                #v = !1;
                #b;
                isOpen = !1;
                currentTab = 0;
                tabs = [];
                constructor() {
                    (async () => {
                        await ImGui.default(), ImGui.CHECKVERSION(), ImGui.CreateContext();
                        const e = ImGui.GetIO();
                        i.Bs.style(), e.Fonts.AddFontDefault();
                        const t = document.getElementById("output") || document.body,
                            a = unsafeWindow.canvas = document.createElement("canvas");
                        t.appendChild(a), a.id = "canvas__imgui", a.tabIndex = 0, a.style.opacity = "0", a.style.position = "absolute", a.style.left = "0px", a.style.right = "0px", a.style.top = "0px", a.style.bottom = "0px", a.style.width = "100%", a.style.height = "100%", a.style.visibility = "hidden", a.style.zIndex = "1000", a.getContext("webgl2", {
                            alpha: !0
                        }) || a.getContext("webgl", {
                            alpha: !0
                        })
                    })(), document.addEventListener("keyup", (e => {
                        if (!i.P6.isChatOpen()) switch (e.code) {
                            case "Insert":
                            case "Numpad0":
                            case "Slash":
                                this.onMenuKeyPressed()
                        }
                    }))
                }
                openingAnimation = () => {
                    40 !== this.#B ? this.#B += 4 : this.#v = !1
                };
                closingAnimation = () => {
                    0 !== this.#B ? this.#B -= 4 : this.#v = !1, this.#v || this.hideMenu()
                };
                applyFilter = e => {
                    canvas.style.opacity = e / 40 * 1, root.style.filter = `blur(${.1 * e}px) brightness(${1 - e / 100})`
                };
                animationTask = () => {
                    this.#v && requestAnimationFrame(this.animationTask), this.isOpen ? this.openingAnimation() : this.closingAnimation(), this.applyFilter(this.#B)
                };
                showMenu = () => {
                    ImGui_Impl.Init(canvas), canvas.style.visibility = "", document.exitPointerLock(), this.#b = requestAnimationFrame(this.process)
                };
                hideMenu = () => {
                    cancelAnimationFrame(this.#b), i.vc.saveStates(), ImGui_Impl.Shutdown(), canvas.style.visibility = "hidden"
                };
                onMenuKeyPressed = () => {
                    (this.isOpen = !this.isOpen) && this.showMenu(), this.#v = !0, requestAnimationFrame(this.animationTask)
                };
                createTabButton = (e, t) => {
                    i.Bs.createActiveButton(e, this.currentTab === t, i.Bs.ImVec2(100, ImGui.GetWindowSize().y / this.tabs.length - 7)) && (this.currentTab = t)
                };
                process = e => {
                    this.#b = requestAnimationFrame(this.process), ImGui_Impl.NewFrame(e), ImGui.NewFrame(), ImGui.SetNextWindowSize(i.Bs.ImVec2(1158, 653)), ImGui.Begin("impulse by qq1719078 & 2310188847", null, ImGui.WindowFlags.NoCollapse | ImGui.WindowFlags.NoResize), i.Bs.createChild("##ut2f", i.Bs.ImVec2(116, 0), (() => {
                        for (const e of this.tabs) this.createTabButton(e.label, this.tabs.indexOf(e))
                    })), ImGui.SameLine(), i.Bs.createChild("##wqaa", i.Bs.ImVec2(0, 0), (() => {
                        this.tabs[this.currentTab].process()
                    })), ImGui.End(), ImGui.EndFrame(), ImGui.Render(), ImGui_Impl.RenderDrawData(ImGui.GetDrawData())
                }
            }
        },
        422: (e, t, a) => {
            var i = a(227);
            i.GI.tabs.push({
                label: "Local tank",
                process: () => {
                    i.Bs.createChild("##crgtj", i.Bs.ImVec2(339, 250), (() => {
                        let e = i.vc.data.airBreakData;
                        ImGui.SliderInt("Speed##kyxu", i.Bs.access(e.speedData, "state"), 1, 1e3), ImGui.SliderInt("Smooth##bshu", i.Bs.access(e.smoothData, "state"), 1, 100), ImGui.Text("Type: "), ImGui.SameLine(), i.Bs.createActiveButton("Default##jzqy", "default" === e.typeData.state, i.Bs.ImVec2(0, 0)) && (e.typeData.state = "default"), ImGui.SameLine(), i.Bs.createActiveButton("AirWalk", "airWalk" === e.typeData.state, i.Bs.ImVec2(0, 0)) && (e.typeData.state = "airWalk"), ImGui.SameLine(), i.Bs.createActiveButton("Simple", "noob" === e.typeData.state, i.Bs.ImVec2(0, 0)) && (e.typeData.state = "noob"), ImGui.Checkbox("Limiting Kill Zones", i.Bs.access(e.killZoneData, "state")), ImGui.Checkbox("Flip", i.Bs.access(e, "flip")), ImGui.Checkbox("Tilt", i.Bs.access(e, "tilt"))
                    }), "AirBreak"), ImGui.SameLine(), i.Bs.createChild("##8757", i.Bs.ImVec2(339, 250), (() => {
                        let e = i.vc.data.syncData;
                        if (i.Bs.ShowHelpMarker("If someone shoots with a striker, the anti-aim will automatically turn on"), ImGui.SameLine(), ImGui.Checkbox("Avoid rockets", i.Bs.access(e.antiStrikerData, "state")), ImGui.SameLine(), i.Bs.createActiveButton("Only enemy##95ewq", "Enemy" === e.antiStrikerData.type, i.Bs.ImVec2(0, 0)) && (e.antiStrikerData.type = "Enemy"), ImGui.SameLine(), i.Bs.createActiveButton("All##opeez", "ALL" === e.antiStrikerData.type, i.Bs.ImVec2(0, 0)) && (e.antiStrikerData.type = "ALL"), i.Bs.ShowHelpMarker("Random teleport around the map"), ImGui.SameLine(), ImGui.Checkbox("Anti-Aim", i.Bs.access(e.randomTeleportData, "state")), i.Bs.ShowHelpMarker("Lifts you up to a height of your choice"), ImGui.SameLine(), ImGui.Checkbox("Avoid mines", i.Bs.access(e.antiMineData, "state")), e.antiMineData.state && (ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 45), ImGui.InputInt("Height", i.Bs.access(e.antiMineData, "height"), 10, 10)), i.Bs.ShowHelpMarker("Position sending interval to the server"), ImGui.SameLine(), ImGui.PushItemWidth(160), ImGui.InputInt("Update interval", i.Bs.access(e, "updateInterval"), 10), ImGui.PopItemWidth(), e.updateInterval < 70 && !0 !== e.warning) {
                            let t = ImGui.GetIO();
                            ImGui.SetNextWindowSize(i.Bs.ImVec2(0, 0)), ImGui.SetNextWindowPos(i.Bs.ImVec2(.5 * t.DisplaySize.x, .5 * t.DisplaySize.y), ImGui.Cond.Always, i.Bs.ImVec2(.5, .5)), ImGui.SetNextWindowFocus(), ImGui.Begin("WARNING", null, ImGui.WindowFlags.NoCollapse | ImGui.WindowFlags.NoResize), ImGui.Text("It is not recommended to select a value\nlessthan 70 ms, it may cause a crash."), ImGui.Button("OK", i.Bs.ImVec2(303, 30)) && (e.warning = !0), ImGui.End()
                        }
                        e.updateInterval < 10 && (e.updateInterval = 10), e.updateInterval > 150 && (e.updateInterval = 150)
                    }), "Sync"), ImGui.SameLine(), i.Bs.createChild("##53jbk", i.Bs.ImVec2(0, 250), (() => {
                        let e = i.vc.data.clickerData;
                        ImGui.Checkbox("Armor", i.Bs.access(e.autoArmorData, "state")), ImGui.Checkbox("Damage", i.Bs.access(e.autoDamageData, "state")), ImGui.Checkbox("Nitro", i.Bs.access(e.autoNitroData, "state")), ImGui.Checkbox("Mine", i.Bs.access(e.autoMiningData, "state")), e.autoMiningData.state && (ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 15), ImGui.SliderInt("Delay##oer3", i.Bs.access(e.autoMiningData, "delay"), 5, 50), ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 15), ImGui.SliderInt("Multiply##zxaq1", i.Bs.access(e.autoMiningData, "multiply"), 1, 10)), ImGui.Checkbox("First aid kit", i.Bs.access(e.autoHealingData, "state")), e.autoHealingData.state && (ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 15), ImGui.SliderInt("Delay##jypy", i.Bs.access(e.autoHealingData, "delay"), 5, 50), ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 15), ImGui.SliderInt("Multiply##it401", i.Bs.access(e.autoHealingData, "multiply"), 1, 10))
                    }), "Clicker"), i.Bs.createChild("##vtse", i.Bs.ImVec2(0, 0), (() => {
                        i.Bs.ShowHelpMarker("Removes all mines on the map (FPS UP)"), ImGui.SameLine(), ImGui.Checkbox("Remove mines", i.Bs.access(i.vc.data.removeMinesData, "state")), ImGui.SameLine(), i.Bs.createActiveButton("Remove only my team", "TEAM" === i.vc.data.removeMinesData.type, i.Bs.ImVec2(0, 0)) && (i.vc.data.removeMinesData.type = "TEAM"), ImGui.SameLine(), i.Bs.createActiveButton("Remove all mines", "ALL" === i.vc.data.removeMinesData.type, i.Bs.ImVec2(0, 0)) && (i.vc.data.removeMinesData.type = "ALL"), i.Bs.ShowHelpMarker("Automatically turns on clicker (Healing) when health is not full or there is a mammoth overdrive turned on"), ImGui.SameLine(), ImGui.Checkbox("Auto healing clicker", i.Bs.access(i.vc.data.otherData, "autoHealingClicker")), i.Bs.ShowHelpMarker("Infinite acceleration"), ImGui.SameLine(), ImGui.Checkbox("SpeedHack", i.Bs.access(i.vc.data.otherData, "speedHack")), i.Bs.ShowHelpMarker("A third-person camera like in GTA. Distance key [V]"), ImGui.SameLine(), ImGui.Checkbox("GTA Camera", i.Bs.access(i.vc.data.cameraData, "state")), i.Bs.ShowHelpMarker("Disabling the tank drop"), ImGui.SameLine(), ImGui.Checkbox("Freeze Tanks", i.Bs.access(i.vc.data.otherData, "freezeTanks")), i.Bs.ShowHelpMarker("Disabling tank collision"), ImGui.SameLine(), ImGui.Checkbox("No collision", i.Bs.access(i.vc.data.otherData, "noCollision")), i.Bs.ShowHelpMarker("."), ImGui.SameLine(), ImGui.Checkbox("Automatic shooting", i.Bs.access(i.vc.data.otherData, "autoShot"))
                    }), "Other")
                }
            })
        },
        1: (e, t, a) => {
            var i = a(227);
            i.GI.tabs.push({
                label: "Weapons",
                process: () => {
                    i.Bs.createChild("##pop23", i.Bs.ImVec2(0, 0), (() => {
                        ImGui.Checkbox("Get a target for the aimbot with the scope", i.Bs.access(i.vc.data.weaponData.strikerData.getTargetForAimWithScope, "state")), ImGui.Checkbox("Get a teleport target with a scope", i.Bs.access(i.vc.data.weaponData.strikerData.getTargetForTPWithScope, "state")), ImGui.Text("P.S. if off: you can select the target in Other tanks"), ImGui.Separator(), i.Bs.ShowHelpMarker("If the rockets are stuck and nothing happens, press the [R] key."), ImGui.SameLine(), ImGui.Checkbox("Rocket teleport", i.Bs.access(i.vc.data.weaponData.strikerData.shellsTeleportData, "state")), i.vc.data.weaponData.strikerData.shellsTeleportData.state && (ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 45), i.Bs.ShowHelpMarker("Mack - thanks for the idea!"), ImGui.SameLine(), ImGui.Checkbox("No collision shells (Experimental)", i.Bs.access(i.vR.rocketTP, "teleportToTarget"))), i.Bs.ShowHelpMarker("If you want to change the target, but the aimbot does not let you do so, press the [N] key."), ImGui.SameLine(), ImGui.Checkbox("Aimbot", i.Bs.access(i.vc.data.weaponData.strikerData.aimBotData, "state"))
                    }), "Striker"), ImGui.Text("coming soon")
                }
            })
        },
        641: (e, t, a) => {
            var i = a(227);
            const s = e => parseInt((e => [parseInt((255 * e[0]).toFixed(1)), parseInt((255 * e[1]).toFixed(1)), parseInt((255 * e[2]).toFixed(1))].map((e => {
                const t = e.toString(16);
                return 1 === t.length ? "0" + t : t
            })).join(""))(e), 16);
            let o = 0;
            i.GI.tabs.push({
                label: "Visuals",
                process: () => {
                    i.Bs.createChild("##gk7q", i.Bs.ImVec2(339, 298.5), (() => {
                        ImGui.Checkbox("Enabled", i.Bs.access(i.vc.data.wallHackData.tankGlowData, "state")), ImGui.Checkbox("Only enemy", i.Bs.access(i.vc.data.wallHackData.tankGlowData, "onlyEnemy"))
                    }), "Glow"), i.Bs.createChild("##jr4l", i.Bs.ImVec2(339, 298.5), (() => {
                        ImGui.Checkbox("Enabled", i.Bs.access(i.vc.data.wallHackData.tankChamsData, "state")), ImGui.Checkbox("Only enemy", i.Bs.access(i.vc.data.wallHackData.tankChamsData, "onlyEnemy"))
                    }), "Chams"), ImGui.SameLine(), ImGui.SetCursorPosY(ImGui.GetCursorPosY() - 303), i.Bs.createChild("##y1bm", i.Bs.ImVec2(0, 300), (() => {
                        i.Bs.createChild("##g9eb", i.Bs.ImVec2(0, 35), (() => {
                            i.Bs.createActiveButton("Team", 0 === o, i.Bs.ImVec2(202, 0)) && (o = 0), ImGui.SameLine(), i.Bs.createActiveButton("Enemy", 1 === o, i.Bs.ImVec2(202, 0)) && (o = 1), ImGui.SameLine(), i.Bs.createActiveButton("Target", 2 === o, i.Bs.ImVec2(202, 0)) && (o = 2)
                        })), i.Bs.createChild("##tn9u", i.Bs.ImVec2(0, 225), (() => {
                            switch (o) {
                                case 0:
                                    i.Bs.createChild("##7shn", i.Bs.ImVec2(0, 100), (() => {
                                        ImGui.ColorEdit3("##j8im", i.vc.data.wallHackData.tankGlowData.colorTeam.rgb), i.vc.data.wallHackData.tankGlowData.colorTeam.dec = s(i.vc.data.wallHackData.tankGlowData.colorTeam.rgb)
                                    }), "Glow"), i.Bs.createChild("##y4w", i.Bs.ImVec2(0, 0), (() => {
                                        ImGui.ColorEdit4("##hkb8", i.vc.data.wallHackData.tankChamsData.colorTeam)
                                    }), "Chams");
                                    break;
                                case 1:
                                    i.Bs.createChild("##epop", i.Bs.ImVec2(0, 100), (() => {
                                        ImGui.ColorEdit3("##34mt", i.vc.data.wallHackData.tankGlowData.colorEnemy.rgb), i.vc.data.wallHackData.tankGlowData.colorEnemy.dec = s(i.vc.data.wallHackData.tankGlowData.colorEnemy.rgb)
                                    }), "Glow"), i.Bs.createChild("##y4w", i.Bs.ImVec2(0, 0), (() => {
                                        ImGui.ColorEdit4("##n8ii", i.vc.data.wallHackData.tankChamsData.colorEnemy)
                                    }), "Chams");
                                    break;
                                case 2:
                                    i.Bs.createChild("##u0osh", i.Bs.ImVec2(0, 100), (() => {
                                        ImGui.ColorEdit3("##vbng", i.vc.data.wallHackData.tankGlowData.colorTarget.rgb), i.vc.data.wallHackData.tankGlowData.colorTarget.dec = s(i.vc.data.wallHackData.tankGlowData.colorTarget.rgb)
                                    }), "Glow"), i.Bs.createChild("##y4w", i.Bs.ImVec2(0, 0), (() => {
                                        ImGui.ColorEdit4("##b4gpj", i.vc.data.wallHackData.tankChamsData.colorTarget)
                                    }), "Chams")
                            }
                        }))
                    }), "Colors"), ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 347), i.Bs.createChild("##wk2d", i.Bs.ImVec2(0, 0), (() => {
                        ImGui.SliderFloat("blur", i.Bs.access(i.vc.data.filtersData, "blur"), 0, 5), ImGui.SliderFloat("brightness", i.Bs.access(i.vc.data.filtersData, "brightness"), 0, 1), ImGui.SliderFloat("contrast", i.Bs.access(i.vc.data.filtersData, "contrast"), 0, 200), ImGui.SliderFloat("grayscale", i.Bs.access(i.vc.data.filtersData, "grayscale"), 0, 100), ImGui.SliderFloat("hue-rotate", i.Bs.access(i.vc.data.filtersData, "hue-rotate"), 0, 360), ImGui.SliderFloat("invert", i.Bs.access(i.vc.data.filtersData, "invert"), 0, 100), ImGui.SliderFloat("saturate", i.Bs.access(i.vc.data.filtersData, "saturate"), 0, 5), ImGui.SliderFloat("sepia", i.Bs.access(i.vc.data.filtersData, "sepia"), 0, 100)
                    }), "Filters")
                }
            })
        },
        229: (e, t, a) => {
            var i = a(227);
            let s = {
                tank: null,
                name: "Not selected"
            };
            i.GI.tabs.push({
                label: "Other tanks",
                process: () => {
                    i.Bs.createChild("##rl2kf", i.Bs.ImVec2(497, 298), (() => {
                        let e = i.P6.getTanks();
                        if (i.P6.isArrayValid(e))
                            for (const t of e) {
                                if (i.P6.isTankEnemy(t)) continue;
                                let e = t.UserTitleComponent?.configuration_0?.userName;
                                "string" == typeof e && ImGui.Selectable(e, s.tank === t) && (s.tank = t, s.name = e)
                            }
                    }), "My team"), ImGui.SameLine(), i.Bs.createChild("##c937", i.Bs.ImVec2(0, 298), (() => {
                        let e = i.P6.getTanks(!0);
                        if (i.P6.isArrayValid(e))
                            for (const t of e) {
                                let e = t.UserTitleComponent?.configuration_0?.userName;
                                "string" == typeof e && ImGui.Selectable(e, s.tank === t) && (s.tank = t, s.name = e)
                            }
                    }), "Enemy team"), i.Bs.createChild("##5vge", i.Bs.ImVec2(0, 0), (() => {
                        if (!s.tank) return s.tank = null, void (s.name = "Not selected");
                        ImGui.Button(`Set target for Rocket Teleport ${JSON.stringify(i.vc.data.weaponData.strikerData.nextTargetData.bind.keys)}`, i.Bs.ImVec2(986, 30)) && (i.vR.rocketTP.target = i.P6.getTankId(s.tank)), ImGui.Button("Set target for aimBot", i.Bs.ImVec2(986, 30)) && (i.vR.aimBotTarget = i.P6.getTankId(s.tank)), ImGui.Button(`Stick ${JSON.stringify(i.vc.data.stickData.nextTargetData.bind.keys)}`, i.Bs.ImVec2(986, 30)) && i.ct.stick(s.tank), ImGui.Button(`Spectate ${JSON.stringify(i.vc.data.spectateData.nextTargetData.bind.keys)}`, i.Bs.ImVec2(986, 30)) && i.$l.spectate(s.tank), ImGui.Separator();
                        let e = i.vc.data.stickData.deactivateData.bind.keys,
                            t = i.vc.data.spectateData.deactivateData.bind.keys;
                        ImGui.Text(`Press the ${JSON.stringify(e)} key to turn off the stick and ${JSON.stringify(t)} spectate`)
                    }), "string" == typeof s.name ? s.name : "Not selected")
                }
            })
        },
        500: (e, t, a) => {
            var i = a(227);
            const s = {
                function: "Not selected"
            },
                o = (e, t = i.Bs.ImVec2(0, 0)) => {
                    i.Bs.createActiveButton(e, s.function === e, t) && (s.function = e)
                };
            i.GI.tabs.push({
                label: "Binds",
                process: () => {
                    i.Bs.createChild("##peh32", i.Bs.ImVec2(0, 530), (() => {
                        (e => {
                            let t;
                            switch (e) {
                                case "AirBreak":
                                    t = i.vc.data.airBreakData, i.Bs.bindKey("Forward", i.Bs.ImVec2(986, 20), t.movementData.forward.bind), i.Bs.bindKey("Back", i.Bs.ImVec2(986, 20), t.movementData.back.bind), i.Bs.bindKey("Left", i.Bs.ImVec2(986, 20), t.movementData.left.bind), i.Bs.bindKey("Right", i.Bs.ImVec2(986, 20), t.movementData.right.bind), i.Bs.bindKey("Up", i.Bs.ImVec2(986, 20), t.movementData.up.bind), i.Bs.bindKey("Down", i.Bs.ImVec2(986, 20), t.movementData.down.bind), i.Bs.bindKey("Toggle state", i.Bs.ImVec2(986, 20), t.toggleStateData.bind), i.Bs.bindKey("Type: default", i.Bs.ImVec2(986, 20), t.typeData.default.bind), i.Bs.bindKey("Type: airWalk", i.Bs.ImVec2(986, 20), t.typeData.airWalk.bind), i.Bs.bindKey("Type: simple", i.Bs.ImVec2(986, 20), t.typeData.simple.bind), i.Bs.bindKey("Speed +", i.Bs.ImVec2(986, 20), t.speedData.inc.bind), i.Bs.bindKey("Speed -", i.Bs.ImVec2(986, 20), t.speedData.dec.bind), i.Bs.bindKey("Smooth +", i.Bs.ImVec2(986, 20), t.smoothData.inc.bind), i.Bs.bindKey("Smooth -", i.Bs.ImVec2(986, 20), t.smoothData.dec.bind), i.Bs.bindKey("Limiting Kill Zones", i.Bs.ImVec2(986, 20), t.killZoneData.bind);
                                    break;
                                case "Sync":
                                    t = i.vc.data.syncData, i.Bs.bindKey("Avoid rockets", i.Bs.ImVec2(986, 20), t.antiStrikerData.bind), i.Bs.bindKey("Anti-Aim", i.Bs.ImVec2(986, 20), t.randomTeleportData.bind), i.Bs.bindKey("Avoid mines", i.Bs.ImVec2(986, 20), t.antiMineData.bind);
                                    break;
                                case "Clicker":
                                    t = i.vc.data.clickerData, i.Bs.bindKey("Armor", i.Bs.ImVec2(986, 20), t.autoArmorData.bind), i.Bs.bindKey("Damage", i.Bs.ImVec2(986, 20), t.autoDamageData.bind), i.Bs.bindKey("Nitro", i.Bs.ImVec2(986, 20), t.autoNitroData.bind), i.Bs.bindKey("Mine", i.Bs.ImVec2(986, 20), t.autoMiningData.bind), i.Bs.bindKey("Healing", i.Bs.ImVec2(986, 20), t.autoHealingData.bind);
                                    break;
                                case "Striker":
                                    t = i.vc.data.weaponData.strikerData, i.Bs.bindKey("AimBot", i.Bs.ImVec2(986, 20), t.aimBotData.bind), i.Bs.bindKey("Shells teleport", i.Bs.ImVec2(986, 20), t.shellsTeleportData.bind), i.Bs.bindKey("Get a target for the aimbot with the scope", i.Bs.ImVec2(986, 20), t.getTargetForAimWithScope.bind), i.Bs.bindKey("Get a teleport target with a scope", i.Bs.ImVec2(986, 20), t.getTargetForTPWithScope.bind), i.Bs.bindKey("Next target", i.Bs.ImVec2(986, 20), t.nextTargetData.bind);
                                    break;
                                case "Camera":
                                    t = i.vc.data.cameraData, i.Bs.bindKey("Change distance", i.Bs.ImVec2(986, 20), t.bind);
                                    break;
                                case "Stick":
                                    t = i.vc.data.stickData, i.Bs.bindKey("Next target", i.Bs.ImVec2(986, 20), t.nextTargetData.bind), i.Bs.bindKey("Deactivate", i.Bs.ImVec2(986, 20), t.deactivateData.bind);
                                    break;
                                case "Spectate":
                                    t = i.vc.data.spectateData, i.Bs.bindKey("Next target", i.Bs.ImVec2(986, 20), t.nextTargetData.bind), i.Bs.bindKey("Deactivate", i.Bs.ImVec2(986, 20), t.deactivateData.bind)
                            }
                        })(s.function)
                    }), s.function), i.Bs.createChild("##sg391", i.Bs.ImVec2(0, 0), (() => {
                        o("AirBreak", i.Bs.ImVec2(134, 30)), ImGui.SameLine(), o("Sync", i.Bs.ImVec2(134, 30)), ImGui.SameLine(), o("Clicker", i.Bs.ImVec2(134, 30)), ImGui.SameLine(), o("Striker", i.Bs.ImVec2(134, 30)), ImGui.SameLine(), o("Camera", i.Bs.ImVec2(134, 30)), ImGui.SameLine(), o("Stick", i.Bs.ImVec2(134, 30)), ImGui.SameLine(), o("Spectate", i.Bs.ImVec2(134, 30))
                    }), "Functions")
                }
            })
        },
        580: (e, t, a) => {
            a.d(t, {
                Z: () => i
            });
            class i {
                data = {
                    airBreakData: {
                        ID: "2",
                        movementData: {
                            forward: {
                                bind: {
                                    keys: ["KeyW"],
                                    state: !1
                                }
                            },
                            back: {
                                bind: {
                                    keys: ["KeyS"],
                                    state: !1
                                }
                            },
                            left: {
                                bind: {
                                    keys: ["KeyA"],
                                    state: !1
                                }
                            },
                            right: {
                                bind: {
                                    keys: ["KeyD"],
                                    state: !1
                                }
                            },
                            up: {
                                bind: {
                                    keys: ["KeyQ"],
                                    state: !1
                                }
                            },
                            down: {
                                bind: {
                                    keys: ["KeyE"],
                                    state: !1
                                }
                            }
                        },
                        toggleStateData: {
                            bind: {
                                keys: ["ShiftRight"],
                                pressed: !1,
                                state: !1
                            }
                        },
                        typeData: {
                            state: "default",
                            default: {
                                bind: {
                                    keys: [],
                                    pressed: !1,
                                    state: !1
                                }
                            },
                            airWalk: {
                                bind: {
                                    keys: [],
                                    pressed: !1,
                                    state: !1
                                }
                            },
                            simple: {
                                bind: {
                                    keys: [],
                                    pressed: !1,
                                    state: !1
                                }
                            }
                        },
                        speedData: {
                            state: 70,
                            inc: {
                                bind: {
                                    keys: [],
                                    state: !1
                                }
                            },
                            dec: {
                                bind: {
                                    keys: [],
                                    state: !1
                                }
                            }
                        },
                        smoothData: {
                            state: 1,
                            inc: {
                                bind: {
                                    keys: [],
                                    state: !1
                                }
                            },
                            dec: {
                                bind: {
                                    keys: [],
                                    state: !1
                                }
                            }
                        },
                        killZoneData: {
                            state: !0,
                            bind: {
                                keys: [],
                                pressed: !1,
                                state: !1
                            }
                        },
                        flip: !1,
                        tilt: !0
                    },
                    removeMinesData: {
                        ID: "0",
                        state: !0,
                        type: "ALL"
                    },
                    noKnockbackData: {
                        ID: "0",
                        mply: 1
                    },
                    otherData: {
                        ID: "2",
                        autoHealingClicker: !1,
                        speedHack: !1,
                        freezeTanks: !0,
                        noCollision: !1,
                        showAlert: !0,
                        autoShot: !1
                    },
                    syncData: {
                        ID: "1",
                        updateInterval: 70,
                        warning: !1,
                        antiStrikerData: {
                            state: !1,
                            type: "Enemy",
                            bind: {
                                keys: [],
                                pressed: !1,
                                state: !1
                            }
                        },
                        randomTeleportData: {
                            state: !1,
                            bind: {
                                keys: [],
                                pressed: !1,
                                state: !1
                            }
                        },
                        antiMineData: {
                            state: !1,
                            height: 200,
                            bind: {
                                keys: [],
                                pressed: !1,
                                state: !1
                            }
                        }
                    },
                    wallHackData: {
                        ID: "0",
                        tankGlowData: {
                            state: !1,
                            onlyEnemy: !1,
                            colorEnemy: {
                                dec: 10027085,
                                rgb: [.6, 0, .3]
                            },
                            colorTarget: {
                                dec: 6750054,
                                rgb: [.4, 1, .4]
                            },
                            colorTeam: {
                                dec: 10066431,
                                rgb: [.6, .6, 1]
                            }
                        },
                        tankChamsData: {
                            state: !1,
                            onlyEnemy: !1,
                            colorEnemy: [.6, 0, .3, 1],
                            colorTarget: [.4, 1, .4, 1],
                            colorTeam: [.6, .6, 1, 1]
                        }
                    },
                    clickerData: {
                        ID: "1",
                        autoHealingData: {
                            state: !1,
                            delay: 30,
                            multiply: 1,
                            bind: {
                                keys: [],
                                pressed: !1,
                                state: !1
                            }
                        },
                        autoArmorData: {
                            state: !1,
                            bind: {
                                keys: [],
                                pressed: !1,
                                state: !1
                            }
                        },
                        autoDamageData: {
                            state: !1,
                            bind: {
                                keys: [],
                                pressed: !1,
                                state: !1
                            }
                        },
                        autoNitroData: {
                            state: !1,
                            bind: {
                                keys: [],
                                pressed: !1,
                                state: !1
                            }
                        },
                        autoMiningData: {
                            state: !1,
                            delay: 30,
                            multiply: 1,
                            bind: {
                                keys: [],
                                pressed: !1,
                                state: !1
                            }
                        }
                    },
                    weaponData: {
                        ID: "0",
                        strikerData: {
                            aimBotData: {
                                state: !1,
                                bind: {
                                    keys: ["KeyN"],
                                    state: !1
                                }
                            },
                            shellsTeleportData: {
                                state: !1,
                                bind: {
                                    keys: ["KeyR"],
                                    state: !1
                                }
                            },
                            getTargetForAimWithScope: {
                                state: !1,
                                bind: {
                                    keys: [],
                                    pressed: !1,
                                    state: !1
                                }
                            },
                            getTargetForTPWithScope: {
                                state: !1,
                                bind: {
                                    keys: [],
                                    pressed: !1,
                                    state: !1
                                }
                            },
                            nextTargetData: {
                                bind: {
                                    keys: ["Numpad6"],
                                    pressed: !1,
                                    state: !1
                                }
                            }
                        }
                    },
                    cameraData: {
                        ID: "0",
                        state: !0,
                        bind: {
                            keys: ["KeyV"],
                            pressed: !1,
                            state: !1
                        }
                    },
                    stickData: {
                        ID: "0",
                        nextTargetData: {
                            bind: {
                                keys: ["Numpad4"],
                                pressed: !1,
                                state: !1
                            }
                        },
                        deactivateData: {
                            bind: {
                                keys: ["KeyB"],
                                pressed: !1,
                                state: !1
                            }
                        }
                    },
                    spectateData: {
                        ID: "0",
                        nextTargetData: {
                            bind: {
                                keys: [],
                                pressed: !1,
                                state: !1
                            }
                        },
                        deactivateData: {
                            bind: {
                                keys: ["KeyB"],
                                pressed: !1,
                                state: !1
                            }
                        }
                    },
                    filtersData: {
                        ID: "0",
                        blur: 0,
                        brightness: 0,
                        contrast: 0,
                        grayscale: 0,
                        "hue-rotate": 0,
                        invert: 0,
                        saturate: 0,
                        sepia: 0
                    }
                };
                clearCookies = () => {
                    for (let e in this.data) localStorage.removeItem(e)
                };
                saveState = e => {
                    localStorage.setItem(e, JSON.stringify(this.data[e]))
                };
                saveStates = () => {
                    for (let e in this.data) this.saveState(e)
                };
                constructor() {
                    for (let e in this.data) {
                        let t = localStorage.getItem(e);
                        t && (t = JSON.parse(t), this.data[e].ID === t.ID) ? this.data[e] = t : (console.error(`[impulse] ${(new Date).toJSON().slice(11, 19)} - No config found - ${e}`), this.saveState(e))
                    }
                    this.data.otherData.showAlert && (this.data.otherData.showAlert = !1, alert("Используйте только на тестовом сервере и только в режиме паркур!\nUse only on the test server and only in parkour mode!")), this.saveStates()
                }
            }
        },
        600: (e, t, a) => {
            a.r(t), a.d(t, {
                ImVec2: () => l,
                ImVec4: () => d,
                ShowHelpMarker: () => c,
                access: () => n,
                bindKey: () => u,
                createActiveButton: () => o,
                createChild: () => s,
                getKeysWindow: () => m,
                style: () => r
            });
            var i = a(680);
            const s = (e, t, a, i) => {
                ImGui.BeginChild(e, t, !0, i ? ImGui.WindowFlags.MenuBar : void 0), i && ImGui.BeginMenuBar() && (ImGui.SetCursorPosX(ImGui.GetWindowSize().x / 2 - i.length * ImGui.GetFontSize() / 4), ImGui.TextUnformatted(i), ImGui.EndMenuBar()), a(), ImGui.EndChild()
            },
                o = (e, t, a) => {
                    t ? (ImGui.PushStyleColor(ImGui.Col.Button, new ImGui.Color(.26, .26, .26)), ImGui.PushStyleColor(ImGui.Col.Text, ImGui.GetStyleColorVec4(ImGui.Col.Text))) : (ImGui.PushStyleColor(ImGui.Col.Button, ImGui.GetStyleColorVec4(ImGui.Col.Button)), ImGui.PushStyleColor(ImGui.Col.Text, ImGui.GetStyleColorVec4(ImGui.Col.TextDisabled)));
                    let i = ImGui.Button(e, a);
                    return ImGui.PopStyleColor(2), i
                },
                n = (e, t) => (a = e[t]) => e[t] = a,
                r = () => {
                    let e = ImGui.GetStyle(),
                        t = ImGui.GetStyle().Colors;
                    e.Alpha = 1, e.WindowPadding.x = 8, e.WindowPadding.y = 8, e.WindowRounding = 3, e.PopupRounding = 3, e.WindowTitleAlign.x = .5, e.WindowTitleAlign.y = .5, e.FramePadding.x = 4, e.FramePadding.y = 3, e.ItemSpacing.x = 8, e.ItemSpacing.y = 5, e.TouchExtraPadding.x = 0, e.TouchExtraPadding.y = 0, e.IndentSpacing = 21, e.ColumnsMinSpacing = 0, e.ScrollbarSize = 6, e.ScrollbarRounding = 0, e.GrabMinSize = 5, e.GrabRounding = 3.3, e.ButtonTextAlign.x = .5, e.ButtonTextAlign.y = .5, e.DisplayWindowPadding.x = 22, e.DisplayWindowPadding.y = 22, e.DisplaySafeAreaPadding.x = 4, e.DisplaySafeAreaPadding.y = 4, e.AntiAliasedLines = !0, e.AntiAliasedFill = !0, e.CurveTessellationTol = 1, t[ImGui.Col.Text] = d(1, 1, 1, 1), t[ImGui.Col.TextDisabled] = d(.3, .31, .34, 1), t[ImGui.Col.WindowBg] = d(.11, .13, .16, 1), t[ImGui.Col.ChildBg] = d(.16, .17, .2, 1), t[ImGui.Col.PopupBg] = d(.16, .17, .2, 1), t[ImGui.Col.Border] = d(.12, .12, .16, 1), t[ImGui.Col.BorderShadow] = d(0, 0, 0, 0), t[ImGui.Col.FrameBg] = d(.09, .1, .15, 1), t[ImGui.Col.FrameBgHovered] = d(.12, .13, .17, 1), t[ImGui.Col.FrameBgActive] = d(.07, .08, .13, 1), t[ImGui.Col.TitleBg] = d(.14, .14, .14, 1), t[ImGui.Col.TitleBgActive] = d(.14, .14, .14, 1), t[ImGui.Col.TitleBgCollapsed] = d(.14, .14, .14, 1), t[ImGui.Col.MenuBarBg] = d(.14, .14, .14, 1), t[ImGui.Col.ScrollbarBg] = d(.17, .17, .17, 1), t[ImGui.Col.ScrollbarGrab] = d(.25, .25, .25, 1), t[ImGui.Col.ScrollbarGrabHovered] = d(.25, .25, .25, 1), t[ImGui.Col.ScrollbarGrabActive] = d(.25, .25, .25, 1), t[ImGui.Col.CheckMark] = d(.86, .87, .9, 1), t[ImGui.Col.SliderGrab] = d(.48, .49, .51, 1), t[ImGui.Col.SliderGrabActive] = d(.66, .67, .69, 1), t[ImGui.Col.Button] = d(.09, .1, .15, 1), t[ImGui.Col.ButtonHovered] = d(.12, .13, .17, 1), t[ImGui.Col.ButtonActive] = d(.07, .08, .13, 1), t[ImGui.Col.Header] = d(.29, .34, .43, 1), t[ImGui.Col.HeaderHovered] = d(.21, .24, .31, 1), t[ImGui.Col.HeaderActive] = d(.29, .34, .43, 1), t[ImGui.Col.Separator] = d(.43, .43, .5, .5), t[ImGui.Col.SeparatorHovered] = d(.43, .43, .5, .5), t[ImGui.Col.SeparatorActive] = d(.43, .43, .5, .5), t[ImGui.Col.ResizeGrip] = d(.26, .59, .98, .25), t[ImGui.Col.ResizeGripHovered] = d(.26, .59, .98, .67), t[ImGui.Col.ResizeGripActive] = d(.26, .59, .98, .95), t[ImGui.Col.Tab] = d(0, 0, 0, 0), t[ImGui.Col.TabHovered] = d(0, 0, 0, 0), t[ImGui.Col.TabActive] = d(.2, .22, .27, 1), t[ImGui.Col.TabUnfocused] = d(.07, .1, .15, .97), t[ImGui.Col.TabUnfocusedActive] = d(.14, .26, .42, 1), t[ImGui.Col.PlotLines] = d(.61, .61, .61, 1), t[ImGui.Col.PlotLinesHovered] = d(1, .43, .35, 1), t[ImGui.Col.PlotHistogram] = d(.9, .7, 0, 1), t[ImGui.Col.PlotHistogramHovered] = d(1, .6, 0, 1), t[ImGui.Col.TextSelectedBg] = d(.25, .25, .25, .5), t[ImGui.Col.DragDropTarget] = d(1, 1, 0, .9), t[ImGui.Col.NavHighlight] = d(.26, .59, .98, 1), t[ImGui.Col.NavWindowingHighlight] = d(1, 1, 1, .7), t[ImGui.Col.NavWindowingDimBg] = d(.8, .8, .8, .2), t[ImGui.Col.ModalWindowDimBg] = d(.8, .8, .8, .35)
                },
                c = e => {
                    ImGui.TextDisabled("(?)"), ImGui.IsItemHovered() && (ImGui.BeginTooltip(), ImGui.PushTextWrapPos(35 * ImGui.GetFontSize()), ImGui.TextUnformatted(e), ImGui.PopTextWrapPos(), ImGui.EndTooltip())
                },
                l = (e, t) => new ImGui.Vec2(e, t),
                d = (e, t, a, i = 1) => new ImGui.Vec4(e, t, a, i),
                m = e => {
                    let t = !1,
                        a = ImGui.GetIO();
                    return ImGui.SetNextWindowSize(l(0, 0)), ImGui.SetNextWindowPos(l(.5 * a.DisplaySize.x, .5 * a.DisplaySize.y), ImGui.Cond.Always, l(.5, .5)), ImGui.SetNextWindowFocus(), ImGui.Begin("press the key", null, ImGui.WindowFlags.NoCollapse | ImGui.WindowFlags.NoResize), ImGui.Text(`Current bind: ${JSON.stringify(e)}`), ImGui.Text(`Pressed keys: ${JSON.stringify(i.kp.keyPresseds)}`), ImGui.Button("OK", l(.3 * ImGui.GetWindowSize().x, 30)) && (t = JSON.parse(JSON.stringify(i.kp.keyPresseds))), ImGui.SameLine(), ImGui.Button("Clear", l(.3 * ImGui.GetWindowSize().x, 30)) && (i.kp.keyPresseds = []), ImGui.SameLine(), ImGui.Button("Cancel", l(.3 * ImGui.GetWindowSize().x, 30)) && (t = !0), ImGui.End(), t
                },
                u = (e, t, a) => {
                    if (ImGui.Button(e, t) && (a.state = !0), a.state) {
                        let e = m(a.keys);
                        !1 !== e && (!0 !== e && (a.keys = e), a.state = !1)
                    }
                }
        },
        680: (e, t, a) => {
            a.d(t, {
                kp: () => i
            });
            const i = unsafeWindow.kp = new class {
                keyPresseds = [];
                constructor() {
                    document.addEventListener("keydown", (e => {
                        !1 === this.keyPresseds.includes(e.code) && this.keyPresseds.push(e.code)
                    })), document.addEventListener("keyup", (e => {
                        if (!0 === this.keyPresseds.includes(e.code)) {
                            let t = this.keyPresseds.indexOf(e.code);
                            t > -1 && this.keyPresseds.splice(t, 1)
                        }
                    })), unsafeWindow.addEventListener("visibilitychange", (() => {
                        this.keyPresseds = []
                    })), unsafeWindow.addEventListener("focus", (() => {
                        this.keyPresseds = []
                    }))
                }
                isKeyPressed = e => this.keyPresseds.includes(e)
            }
        },
        75: (e, t, a) => {
            a.d(t, {
                W: () => o,
                Z: () => c
            });
            var i = a(227),
                s = a(680);
            const o = {
                None: 0,
                LessX: 1,
                GreaterX: 2,
                LessY: 4,
                GreaterY: 8,
                LessZ: 16,
                GreaterZ: 32
            },
                n = {
                    space: {
                        maxXY: 499,
                        maxZ: 3399,
                        minZ: 99
                    },
                    default: {
                        maxXY: 499,
                        maxZ: 1999,
                        minZ: 99
                    },
                    remaster: {
                        maxXY: -14200,
                        maxZ: 1790,
                        minZ: 99
                    }
                },
                r = [{
                    high_: 376,
                    low_: -110954192
                }, {
                    high_: 0,
                    low_: 500401401
                }];
            class c {
                getTime = () => {
                    let e = new Date;
                    return `${e.getHours() < 10 ? `
                        0$ {
                            e.getHours()
                        }
                        `: e.getHours()}:${e.getMinutes() < 10 ? `
                        0$ {
                            e.getMinutes()
                        }
                        `: e.getMinutes()}:${e.getSeconds() < 10 ? `
                        0$ {
                            e.getSeconds()
                        }
                        `: e.getSeconds()}`
                };
                debug = function () {
                    console.debug(`[impulse:${arguments[0]}:${arguments[1]}] ${this.getTime()} - Function ${arguments[2]} -`, arguments[3])
                };
                isArrayPressed = e => {
                    if (!this.isArrayValid(e)) return !1;
                    for (let t of e)
                        if (!this.getKeyState(t)) return !1;
                    return !0
                };
                isBindPressed = e => {
                    if (i.GI.isOpen) return !1;
                    let t = e.bind;
                    if ("pressed" in t) {
                        let e = this.isArrayPressed(t.keys);
                        if (!1 === t.pressed) {
                            if (!0 === e) return t.pressed = !0, !0
                        } else if (!0 !== e) return t.pressed = !1, !1;
                        return !1
                    }
                    return this.isArrayPressed(t.keys)
                };
                getKeyState = e => s.kp.isKeyPressed(e) && !this.isChatOpen();
                isChatOpen = () => i.UJ.gameMode?.BattleChatComponent?.isInputActive_0;
                isArrayValid = e => void 0 !== e && Array.isArray(e) && e.length > 0;
                getComponentNames = e => {
                    if (!this.isArrayValid(e)) return;
                    let t = {};
                    for (const a of e) {
                        let e = a.constructor?.$metadata$?.simpleName;
                        e && (t[e] = a)
                    }
                    return t.originalArray = e, t
                };
                isRemasterMap = e => {
                    for (let t of r)
                        if (t.low_ === e.mapId.low_ && t.high_ === e.mapId.high_) return !0;
                    return !1
                };
                getKillZone = e => {
                    if (!e) return;
                    let t = 300 === e.gravity_0 ? n.space : !0 === this.isRemasterMap(e) ? n.remaster : n.default;
                    return {
                        maxX: e.bounds.maxX + t.maxXY,
                        minX: e.bounds.minX - t.maxXY,
                        maxY: e.bounds.maxY + t.maxXY,
                        minY: e.bounds.minY - t.maxXY,
                        maxZ: e.bounds.maxZ + t.maxZ,
                        minZ: e.bounds.minZ - t.minZ
                    }
                };
                isNotKillZone = e => {
                    let t = i.UJ.gameMode?.BattleMapComponent,
                        a = o.None;
                    if (!t) return a;
                    let s = this.getKillZone(t);
                    return 0 !== e.x && e.x >= s.maxX && (a |= o.GreaterX), 0 !== e.x && e.x <= s.minX && (a |= o.LessX), 0 !== e.y && e.y >= s.maxY && (a |= o.GreaterY), 0 !== e.y && e.y <= s.minY && (a |= o.LessY), 0 !== e.z && e.z >= s.maxZ && (a |= o.GreaterZ), 0 !== e.z && e.z <= s.minZ && (a |= o.LessZ), a
                };
                outKillZone = (e, t) => {
                    let a = i.UJ.gameMode?.BattleMapComponent;
                    if (!a) return;
                    let s = this.getKillZone(a);
                    t & o.GreaterX && (e.x = s.maxX), t & o.LessX && (e.x = s.minX), t & o.GreaterY && (e.y = s.maxY), t & o.LessY && (e.y = s.minY), t & o.GreaterZ && (e.z = s.maxZ), t & o.LessZ && (e.z = s.minZ)
                };
                isTankEnemy = e => {
                    if (e.entity?.isPossessed) return !1;
                    let t = i.UJ.gameMode?.originalArray?.[0]?.gameMode_0?.possesedTankTeam?.name;
                    return !t || "NONE" === t || t !== e?.TankComponent?.team?.name
                };
                getTanks = (e = !1) => {
                    let t = i.UJ.gameMode?.originalArray?.[0]?.gameMode_0?.tanksOnField?.getTanks()?.array;
                    if (!this.isArrayValid(t)) return;
                    let a = [];
                    for (const i of t) {
                        let t = this.getComponentNames(i.components_0?.array);
                        !i.isPossessed && t && (t.entity = i, e && !this.isTankEnemy(t) || a.push(t))
                    }
                    return a
                };
                getTankByEntity = e => {
                    if (!e) return;
                    let t = this.getComponentNames(e?.components_0?.array);
                    return t ? (t.entity = e, t) : void 0
                };
                getTankById = e => {
                    let t = i.UJ.gameMode?.originalArray?.[0]?.gameMode_0?.tanksOnField;
                    if (!t) return;
                    let a = t.getTank_s8cxhz$(e),
                        s = this.getComponentNames(a?.components_0?.array);
                    return s ? (s.entity = a, s) : void 0
                };
                getTankId = e => {
                    let t = i.UJ.gameMode?.originalArray?.[0]?.gameMode_0;
                    if (t) return t.getPlayerId_e1jjdz$_0(e.entity)
                };
                getUniqueRandomArbitrary = (e, t, a, i) => {
                    let s = this.getRandomArbitrary(a, i);
                    return s <= e + t && s >= e - t ? this.getUniqueRandomArbitrary(e, t, a, i) : s
                };
                getRandomArbitrary = (e, t) => Math.floor(Math.random() * (t - e) + e);
                match = (e, t, a = "function", i = !1) => {
                    if (!e) return;
                    const s = Array.prototype.concat(Object.keys(e), Object.keys(e.__proto__)),
                        o = [];
                    for (const n of s) n.includes(t) && typeof e[n] === a && ("function" === a ? i ? o.push(n) : o.push(e[n].bind(e)) : i ? o.push(n) : o.push(e[n]));
                    return 1 === o.length ? o[0] : 0 === o.length ? void 0 : o
                }
            }
        },
        232: (e, t, a) => {
            a.d(t, {
                Z: () => n
            });
            let i = {},
                s = unsafeWindow.WebSocket;
            class o {
                constructor(e) {
                    this.bubbles = e.bubbles || !1, this.cancelBubble = e.cancelBubble || !1, this.cancelable = e.cancelable || !1, this.currentTarget = e.currentTarget || null, this.data = e.data || null, this.defaultPrevented = e.defaultPrevented || !1, this.eventPhase = e.eventPhase || 0, this.lastEventId = e.lastEventId || "", this.origin = e.origin || "", this.path = e.path || new Array(0), this.ports = e.parts || new Array(0), this.returnValue = e.returnValue || !0, this.source = e.source || null, this.srcElement = e.srcElement || null, this.target = e.target || null, this.timeStamp = e.timeStamp || null, this.type = e.type || "message", this.__proto__ = e.__proto__ || MessageEvent.__proto__
                }
            }
            unsafeWindow.WebSocket = function (e, t) {
                let a;
                this.url = e, this.protocols = t, a = this.protocols ? new s(e, t) : new s(e);
                var n = a.send;
                return a.send = function (e) {
                    arguments[0] = i.before(e, a.url, a) || e, n.apply(this, arguments)
                }, a._addEventListener = a.addEventListener, a.addEventListener = function () {
                    let e = this;
                    var t;
                    return "message" === arguments[0] && (arguments[1] = (t = arguments[1], function () {
                        arguments[0] = i.after(new o(arguments[0]), a.url, a), null !== arguments[0] && t.apply(e, arguments)
                    })), a._addEventListener.apply(this, arguments)
                }, Object.defineProperty(a, "onmessage", {
                    set: function () {
                        let e = this,
                            t = arguments[0],
                            s = function () {
                                arguments[0] = i.after(new o(arguments[0]), a.url, a), null !== arguments[0] && t.apply(e, arguments)
                            };
                        a._addEventListener.apply(this, ["message", s, !1])
                    }
                }), a
            };
            const n = i
        },
        227: (e, t, a) => {
            a.d(t, {
                Ri: () => T,
                Bs: () => w,
                $l: () => G,
                RB: () => A,
                vc: () => D,
                Pr: () => V,
                UJ: () => b,
                GI: () => C,
                YH: () => _,
                oQ: () => H,
                ct: () => x,
                vR: () => z,
                Z_: () => M,
                P6: () => v
            });
            var i = a(75),
                s = a(662),
                o = a(995),
                n = a(580),
                r = a(956),
                c = a(462),
                l = a(38),
                d = a(487),
                m = a(600),
                u = a(551),
                h = a(867),
                p = a(24),
                g = a(272),
                y = a(975),
                f = a(842),
                k = a(374),
                I = a(105),
                B = a(125);
            const v = unsafeWindow.utils = new i.Z,
                b = unsafeWindow.gameObjects = new s.Z,
                S = unsafeWindow.storeOpener = new o.Z,
                D = unsafeWindow.config = new n.Z,
                P = unsafeWindow.removeMines = new r.Z,
                T = unsafeWindow.airBreak = new c.Z,
                G = unsafeWindow.cameraHack = new l.Z,
                C = unsafeWindow.menu = new d.Z,
                w = unsafeWindow.cImGui = m,
                _ = unsafeWindow.other = new u.Z,
                x = unsafeWindow.stick = new h.Z,
                A = unsafeWindow.clicker = new p.Z,
                M = unsafeWindow.sync = new g.Z,
                V = unsafeWindow.consoleLog = new y.Z,
                L = unsafeWindow.wallhack = new f.Z,
                E = unsafeWindow.filters = new k.Z,
                H = unsafeWindow.packetControl = new I.Z,
                z = unsafeWindow.striker = new B.Z,
                Z = () => {
                    T.reset(), G.reset(), x.reset(), P.reset(), A.reset(), M.reset(), V.reset(), z.reset()
                };
            //            if (!document.URL.includes("test-eu.tankionline.com")) throw alert("仅支持测试服！"), new Error("stop");
            //            if ("0.64.3" !== GM_info.script.version) throw alert("У вас установлена устаревшая версия скрипта!\nYou have an outdated version of the script installed!"), unsafeWindow.open("https://raw.githubusercontent.com/sheezzmee/impulse/main/impulse.user.js", "_self"), new Error("stop");
            ! function e() {
                requestAnimationFrame(e);
                const t = b.root,
                    a = b.gameMode,
                    i = b.localTank,
                    s = i?.TankPhysicsComponent,
                    o = i?.FollowCamera,
                    n = i?.FollowCameraHeightController,
                    r = i?.TrackedChassis,
                    c = a?.MinesOnFieldComponent,
                    l = i?.SuppliesHudComponent?.supplyTypeConfigs_0,
                    d = i?.HealthComponent,
                    m = i?.LocalTankStateServerSenderComponent,
                    u = a?.BattleChatComponent,
                    h = i?.SpeedCharacteristicsComponent,
                    p = a?.TankActionLogComponent,
                    g = i?.LocalTrackedChassisServerSenderComponent,
                    y = i?.StrikerWeapon,
                    f = i?.LocalStrikerComponent,
                    k = i?.TurretComponent,
                    I = i?.LocalTurretStateUpdater,
                    B = i?.StrikerRocketFactory,
                    D = i?.WeaponTrigger,
                    C = i?.LocalLockingComponent?.lockingServerInterface_0;
                return t ? (S.openStore(t), t.state?.battleStatistics?.inBattle() ? (P.process(c), _.process(s, d, h, D), V.process(u, p), L.process(), E.process(), i && v.isArrayValid(i.originalArray) ? (T.process(s, o, r, m), G.process(o, n), x.process(s), A.process(l), M.process(m, g, t), void z.process(y, f, k, I, B, D, C, m)) : Z()) : (b.reset(), Z())) : v.debug("src/index.js", 90, "main", "root === undefined (expected object)")
            }()
        }
    },
        t = {};

    function a(i) {
        var s = t[i];
        if (void 0 !== s) return s.exports;
        var o = t[i] = {
            exports: {}
        };
        return e[i](o, o.exports, a), o.exports
    }
    a.d = (e, t) => {
        for (var i in t) a.o(t, i) && !a.o(e, i) && Object.defineProperty(e, i, {
            enumerable: !0,
            get: t[i]
        })
    }, a.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), a.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, a(227), a(662), a(487), a(580), a(600), a(680), a(75), a(232), a(975), a(374), a(105), a(995), a(422), a(1), a(641), a(229), a(500), a(462), a(38), a(24), a(551), a(956), a(867), a(125), a(272), a(842)
})();

