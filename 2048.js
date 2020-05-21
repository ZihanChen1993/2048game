// 创建一个game对象，里面保存了数据以及所有的方法
const game = {
  // 16个格子的数据
  data: [],
  // 游戏分数
  score: 0,
  // game是否可以继续,1为可以 0为不行
  status: 1,

  start() {
    this.score = 0;
    this.status = 1;
    this.data = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    // 生成初始的两个数字
    this.randomNum();
    this.randomNum();
    // 将初始化的数字显示
    this.dataView();
  },
  randomNum() {
    // 随机生成2或者4， 位置也是随机生成
    while (true) {
      console.log('random');
      
      let row = Math.floor(Math.random() * 4);
      let col = Math.floor(Math.random() * 4);
      // 当这个位置没有数时，即为零时
      if (this.data[row][col] == 0) {
        // 随机给位置赋值2或者4
        this.data[row][col] = Math.random() > 0.5 ? 2 : 4;
        this.score += this.data[row][col];
        // 跳出循环，赋值完成
        break;
      }
    }
  },
  dataView() {
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[0].length; j++) {
        // 找到要更新的cell的id
        let index = 'c' + i + j;
        let item = document.querySelector("#" + index);
        // 如果值不为零，则进行更新
        if (this.data[i][j] != 0) {
          item.innerHTML = this.data[i][j];
          // 根据里面的值给与特定的样式
          item.className = 'cell n' + this.data[i][j];
        } else {
          // 否则让值为空，切样式还原
          item.innerHTML = '';
          item.className = 'cell';
        }
      }
    }
    // 更新分数
    document.querySelector('#score_0').innerHTML = this.score;
    if (this.status == 0) {
      // 如果游戏在此时结束，则将结束框显示出来
      document.querySelector('#gameover').style.display = 'block';
      // 显示最终分数
      document.querySelector('#score_02').innerHTML = this.score;
    } else {
      // 如果可以继续，则不显示结算框
      document.querySelector('#gameover').style.display = "none";
    }
  },
  isGameOver() {
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[0].length; j++) {
        if (this.data[i][j] == 0) {
          return false;
        }
        // 判断同一行内是否有数字相同，有则游戏继续
        if (i < 3) {
          if (this.data[i][j] == this.data[i + 1][j]) {
            return false
          }
        }
        // 判断同一列内是否有数字相同，有则游戏继续
        if (j < 3) {
          if (this.data[i][j] == this.data[i][j + 1]) {
            return false;
          }
        }
      }
    }
    console.log('gameover');
    
    // 所有条件不满足，则表明游戏结束
    return true;
  },

  // 上下左右移动
  // moveLeft
  moveLeft() {
    // 给移动前的数组记录一下，
    let before = String(this.data);
    for (let row = 0; row < this.data.length; row++) {
      // 移动每一行
      this.moveLeftInRow(row);
    }
    let after = String(this.data);
    if (after != before) {
      // 如果有变化，则继续生成数字
      this.randomNum();
      // 判断此时游戏是否无法继续
      if (this.isGameOver()) {
        this.status = 0;
      }
      // 将结果显示
      this.dataView();
    }
  },
  moveLeftInRow(row) {
    for (let col = 0; col < this.data[0].length; col++) {
      // 判断下一个非零的点是否存在
      var nextCol = this.moveLeftNextCol(row, col);
      if (nextCol != -1) {
        // 如果当前点为零，则与下一个非零点的值交换
        if (this.data[row][col] == 0) {
          this.data[row][col] = this.data[row][nextCol];
          this.data[row][nextCol] = 0;
          // 如果与零有交换，则当前坐标应当再进行一次判断
          col--;
          // 如果当前点与下一个零点值相等，则成功加倍，
          // 并且可以进行下一个点的判断，游戏设定一个点一次最多加一次倍数
        } else if (this.data[row][col] == this.data[row][nextCol]) {
          this.data[row][col] *= 2;
          this.score += this.data[row][col];
          this.data[row][nextCol] = 0;
        }
      } else {
        // 之后的点全是零，不需要移动，且结束循环
        break;
      }
    }
  },
  moveLeftNextCol(row, col) {
    for (let c = col + 1; c < this.data[0].length; c++) {
      if (this.data[row][c] != 0) {
        return c;
      }
    }
    return -1;
  },
  // moveRight
  moveRight() {
    // 给移动前的数组记录一下，
    let before = String(this.data);
    for (let row = 0; row < this.data.length; row++) {
      // 移动每一行
      this.moveRightInRow(row);
    }
    let after = String(this.data);
    if (after != before) {
      // 如果有变化，则继续生成数字
      this.randomNum();
      // 判断此时游戏是否无法继续
      if (this.isGameOver()) {
        this.status = 0;
      }
      // 将结果显示
      this.dataView();
    }
  },
  moveRightInRow(row) {
    for (let col = 3; col >= 0; col--) {
      // 判断下一个非零的点是否存在
      var nextCol = this.moveRightNextCol(row, col);
      if (nextCol != -1) {
        // 如果当前点为零，则与下一个非零点的值交换
        if (this.data[row][col] == 0) {
          this.data[row][col] = this.data[row][nextCol];
          this.data[row][nextCol] = 0;
          // 如果与零有交换，则当前坐标应当再进行一次判断
          col++;
          // 如果当前点与下一个零点值相等，则成功加倍，
          // 并且可以进行下一个点的判断，游戏设定一个点一次最多加一次倍数
        } else if (this.data[row][col] == this.data[row][nextCol]) {
          this.data[row][col] *= 2;
          this.score += this.data[row][col];
          this.data[row][nextCol] = 0;
        }
      } else {
        // 之后的点全是零，不需要移动，且结束循环
        break;
      }
    }
  },
  moveRightNextCol(row, col) {
    for (let c = col - 1; c >= 0; c--) {
      if (this.data[row][c] != 0) {
        return c;
      }
    }
    return -1;
  },

  // moveUp
  moveUp() {
    let before = String(this.data);
    for (let col = 0; col < this.data[0].length; col ++) {
      this.moveUpInCol(col);
    }
    let after = String(this.data);
    if (after != before) {
      this.randomNum();
      if (this.isGameOver()) {
        this.status = 0;
      }
      this.dataView();
    }

  },
  moveUpInCol(col) {
    for(let row = 0; row < this.data.length; row ++) {
      let nextRow = this.moveUpNextRow(row,col);
      if (nextRow != -1) {
        if (this.data[row][col] == 0) {
          this.data[row][col] = this.data[nextRow][col];
          this.data[nextRow][col] = 0;
          row--;
        } else if (this.data[row][col] == this.data[nextRow][col]) {
          this.data[row][col] *= 2;
          this.score += this.data[row][col];
          this.data[nextRow][col] = 0;
        }
      } else {
        break;
      }
    }
  },
  moveUpNextRow(row, col) {
    for (let r = row + 1; r < this.data.length; r ++) {
      if (this.data[r][col] != 0) {
        return r;
      }
    }
    return -1;
  },
    // moveDown
    moveDown() {
      let before = String(this.data);
      for (let col = 0; col < this.data[0].length; col ++) {
        this.moveDownInCol(col);
      }
      let after = String(this.data);
      if (after != before) {
        this.randomNum();
        if (this.isGameOver()) {
          this.status = 0;
        }
        this.dataView();
      }
    },
    moveDownInCol(col) {
      for(let row = this.data.length -1; row >= 0; row --) {
        let nextRow = this.moveDownNextRow(row,col);
        if (nextRow != -1) {
          if (this.data[row][col] == 0) {
            this.data[row][col] = this.data[nextRow][col];
            this.data[nextRow][col] = 0;
            row++;
          } else if (this.data[row][col] == this.data[nextRow][col]) {
            this.data[row][col] *= 2;
            this.score += this.data[row][col];
            this.data[nextRow][col] = 0;
          }
        } else {
          break;
        }
      }
    },
    moveDownNextRow(row, col) {
      for (let r = row - 1; r >= 0; r --) {
        if (this.data[r][col] != 0) {
          return r;
        }
      }
      return -1;
    },

}



game.start();
document.addEventListener('keyup', (event) => {
  var e = e || event || arguments[0];
  if (event.keyCode == 37) {
    game.moveLeft();
  } else if (event.keyCode == 39) {
    game.moveRight();
  } else if (event.keyCode == 38) {
    game.moveUp();
  } else if (event.keyCode == 40) {
    game.moveDown();
  }
})