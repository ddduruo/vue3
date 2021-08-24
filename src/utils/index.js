/** 
 * 判读是否是移动端  userAgent

*/
export function isMobile() {
    let platform = navigator.platform.toLocaleLowerCase()
    if(platform.includes('win') || platform.includes('mac') || platform.includes('x11')) {
        return false
    }
    return true
}
// 获取裁剪框尺寸
/**
 * 每次调整一个属性 
 */
export function getCutSize(conf) {
    let {winWidth, winHeight, oldPos, time} = conf;
    let min = 200 // 最小裁剪尺寸
    let pos = {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
    }
    //调整是否超出边界
    let adjust = function (pos) {
        if(pos.w > winWidth - pos.x) {
            pos.w = winWidth - pos.x
        }
        if(pos.h > winWidth - pos.h) {
            pos.h = winHeight - pos.h
        }
        if(time == 3) {
            pos.w = pos.w > pos.h? pos.h : pos.w;
            pos.h = pos.w
        }
        if (pos.w < min) {
            pos.w = min;
          }
          if (pos.h < min) {
            pos.h = min;
          }
          if (pos.x > winWidth - pos.w) {
            pos.x = Math.floor((winWidth - pos.w) / 2);
          }
          if (pos.y > winHeight - pos.h) {
            pos.y = Math.floor((winHeight - pos.h) / 2);
          }
          if (pos.x < 0) {
            pos.x = 0;
          }
          if (pos.y < 0) {
            pos.y = 0;
          }
    }
    if (oldPos) {
        pos = { ...oldPos };
        // 随机一个操作属性
        let opr = Math.floor(Math.random() * 10) % 3; // 随机0-3
        if (opr == 0) {
          // 调整wh
          let d_w = pos.w / (time + 1);
          pos.w = Math.floor(pos.w - d_w / 2 + Math.random() * d_w);
          // 调整wh
          let d_h = pos.h / (time + 1);
          if (pos.w > pos.h) {
            pos.h = Math.floor(pos.h - d_h / 2 + Math.random() * d_h);
          } else {
            pos.h = Math.floor(pos.h - d_h / 2 - Math.random() * d_h);
          }
        }
        if (opr == 1) {
          // 调整x
          let d_x = winWidth / (time + 1);
          pos.x = Math.floor(pos.x - d_x / 2 + Math.random() * d_x);
        }
        if (opr == 2) {
          // 调整y
          let d_y = winHeight / (time + 1);
          pos.y = Math.floor(pos.y - d_y / 2 + Math.random() * d_y);
        }
        adjust(pos);
      } else {
        // 初始一个位置
        pos.w = Math.floor(min + Math.random() * (winWidth - min));
        pos.h = Math.floor((pos.w * 2) / 3 + Math.random() * (pos.w / 3));
        pos.x = Math.floor(Math.random() * (winWidth - pos.w));
        pos.y = Math.floor(Math.random() * (winHeight - pos.h));
      }
      return pos;
}