

export const getTimeAtWork = (createTime?:string, closeTime?: string) => {
    const date = new Date()
    const lastTime = Number(createTime?.split(':')[0]) * 3600000 + Number(createTime?.split(':')[1]) * 60000
    const presentTime = Number(closeTime?.split(':')[0]) * 3600000 + Number(closeTime?.split(':')[1]) * 60000

    if(!presentTime) return ''

    return msToTime(presentTime - lastTime)
}


const msToTime = (duration:any) => {
    let seconds:any  = Math.floor((duration / 1000) % 60),
      minutes:any  = Math.floor((duration / (1000 * 60)) % 60),
      hours:any  = Math.floor((duration / (1000 * 60 * 60)) % 24);

      hours = Math.abs(hours);
      minutes = Math.abs(minutes);
      seconds = Math.abs(seconds);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + Math.abs(minutes) : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes ;
  }
