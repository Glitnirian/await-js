export class TimerAwait {
    public startTime: number;

    /**
     * Set the timer start time
     *
     * @param {number} [time]
     * @returns
     * @memberof TimerAwait
     */
    public setStartTime(time?: number) {
        if (!time) {
            time = Date.now();
        }
        this.startTime = time;

        return this;
    }

    /**
     * await a certain duration from the startTime
     * 
     * Date.now() is used automatically! Unless we provide a second argument for it and override it
     *
     * @param {number} timeToAwait
     * @param {number} [nowTime]
     * @returns
     * @memberof TimerAwait
     */
    public await(timeToAwait: number, nowTime?: number) {
        return new Promise((resolve) => {
            if (!nowTime) {
                nowTime = Date.now();
            }

            if (nowTime - timeToAwait < 0) {
                throw new Error('Out of range time to await value!')
            }

            const resolveTimeLimit =  timeToAwait + this.startTime;

            if (nowTime - resolveTimeLimit >= 0) {
                resolve();
            } else {
                setTimeout(() => {
                    resolve();
                }, resolveTimeLimit - nowTime);
            }
        });
    }
}
