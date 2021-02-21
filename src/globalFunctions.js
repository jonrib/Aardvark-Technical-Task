//lib for global functions, can do wihout this if timer component is present in both views (statsAndAction, GameBoardAndSpin)
//TODO refactor code (logging should probably be a seperate global function, logged events could be objects with appropriate levels of severrity: ERROR, MSG, etc...), check for possible issues with timeouts when switching views...
export default{ 
    //called when wheel is spinning, isTimer = true, when component is timer
    spinning(obj, uuid, isTimer){
        if (!obj.loaded)
                return
        obj.$store.commit("log", 'GET Wheel is spinning. Will try to get a result .../game/'+uuid)
        obj.$emit('logged')
        obj.axios.get(obj.$store.state.apiURL+'/game/'+uuid).then((response) => {
            if (response.data.result == null){
                if (response.data.startDelta > 0){
                    obj.$store.commit("log", 'No result yet. Will wait '+response.data.startDelta+' seconds')
                    obj.$emit('logged')
                    setTimeout(() => { this.spinning(obj, uuid, isTimer)}, response.data.startDelta*1000) //check for result again when it's ready
                }else{
                    this.spinning(obj, uuid, isTimer)
                }
            }else{
                this.spinCompleted(obj, response.data.id, response.data.result)
                if (isTimer)
                    obj.isSpin = false
                else{
                    obj.loggedKey++
                    obj.renderKey++
                }
                this.getNextSpin(obj, isTimer)
            }
        }).catch((error) => {
                //handling request error
                obj.$store.commit("log", 'Error '+ error + ' calling URL '+obj.$store.state.apiURL+'/game/'+uuid+' Will retry in 1 second')
                obj.$emit('logged')
                setTimeout(() => {this.spinning(obj, uuid, isTimer)}, 1000)
        })
    },
    //called when spinning is complete
    spinCompleted(obj, id, result){
        obj.$store.commit("addEvent", 'Game '+id+' ended, result is '+result)
        obj.$store.commit("log", 'Spin complete for game '+id+'. The result is '+result)
        obj.$store.commit("addSpinResult", result)
        obj.$emit('spinComplete')
    },
    //gets the next spin time and set appropriate timeout, isTimer = true, when component is timer
    getNextSpin(obj, isTimer, forceStart){
        if (!obj.loaded)
                return
        obj.$store.commit("log", 'GET Getting next spin .../nextGame')
        obj.$emit('logged')
        obj.axios.get(obj.$store.state.apiURL+'/nextGame').then((response) => {
        obj.$store.commit("log", 'Got next spin. ID '+response.data.id)
        if (response.data.fakeStartDelta <= 0 || forceStart){
            obj.$store.commit("log", 'Game is in progress')
            //game is in progress
            let uuid = response.data.uuid
            //spinning is taking place
            if (isTimer){
                obj.isSpin = true
            }else{
                obj.loggedKey++
                obj.renderKey++
            }
            this.spinning(obj, uuid, isTimer)
        }else{
            obj.$store.commit("log", 'Game is not in progress. Will sleep for '+(response.data.fakeStartDelta))
            setTimeout(() => {this.getNextSpin(obj, isTimer, true)}, response.data.fakeStartDelta*1000)
            if (isTimer){
                obj.totalSeconds = response.data.fakeStartDelta
                obj.hoursUntilSpin = Math.floor(obj.totalSeconds / 360)
                obj.minutesUntilSpin = Math.floor((obj.totalSeconds - (obj.hoursUntilSpin * 360)) / 60)
                obj.secondsUntilSpin = obj.totalSeconds - (obj.hoursUntilSpin * 360) - (obj.minutesUntilSpin * 60)
                obj.subtractTime()
            }else{
                obj.loggedKey++
                obj.renderKey++
            }
        }
        obj.$emit('logged')
        }).catch((error) => {
            //handling request error
            obj.$store.commit("log", 'Error '+ error + ' calling URL '+obj.$store.state.apiURL+'/nextGame Will retry in 1 second')
            obj.$emit('logged')
            if (!isTimer){
                obj.loggedKey++
                obj.renderKey++
            }
            setTimeout(() => {this.getNextSpin(obj, isTimer)}, 1000)
        })
    }
}