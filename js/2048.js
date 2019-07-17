Game2048.prototype={

	constructor:Game2048,//初始化
    init:function(){
        this.score=0;
        this.arr=[];
        this.moveAble = false;
        $("#score").html("0");
		$(".number_cell").remove()
        this.creatArr();
    },
    //创建二维数组
    creatArr:function(){
        var j,i;
        for(i=0;i<4;i++){
            this.arr[i]=[];
            for(j=0;j<4;j++){
                this.arr[i][j]={};
                this.arr[i][j].value=0;
            }
        }
        //随机创造初始方格
        var i1,j1;
        i1=getRandom(3);
        j1=getRandom(3);
        this.arrValueUpdate(2,i1,j1);
        this.drawCell(i1,j1);
    },
    //方格数字更新
    arrValueUpdate:function(num,i,j){
        this.arr[i][j].oldValue=this.arr[i][j].value;
        this.arr[i][j].value=num;
    },
    //画方格
    drawCell:function(i,j){
        var item = '<div class="number_cell pos'+i+j+'" ><a class="number_cell_con n2"><div class="span_wrap"><span>'
		+this.arr[i][j].value+'</span></div></a></div>';		
		$(".box").append(item);
    },
    //C
    addEvent:function(){
        var that=this;
        document.onkeydown=function(event){
            var e = event||window.event||arguments.callee.caller.arguments[0];
            var keyCode=e.keyCode;
            switch(keyCode){
                case 37:
                    that.moveAble=false;
                    that.moveLeft();
                    that.checkLose();
                case 38:
                    that.moveAble=false;
                    that.moveUP();
                    that.checkLose();
                case 39:
                    that.moveAble=false;
                    that.moveRight();
                    that.checkLose();
                case 40:
                    that.moveAble=false;
                    that.moveDown();
                    that.checkLose();
                break;

            }
        }
    },
    //控制
    //左
    moveLeft:function(){
        var i,j,k,n;
        for(i=0;i<4;i++){
            n=0;
            for(j=0;j<4;j++){
                if(this.arr[i][j].value==0){
                    continue;
                }
                k=j-1;
                a:
                while(k>=n){
                    if(this.arr[i][k].value==0){
                        if(k==n||(this.arr[i][k-1].value!=0&&this.arr[i][k-1].value!=this.arr[i][j].value)){
                            this.moveCell(i,j,i,k);
                        }
                        k--;
                    }else{
                        if(this.arr[i][k].value==this.arr[i][j].value){
                            this.mergeCell(i,j,i,k);
                            n++;
                        }
                         break a;
                    }
                }
            }
        }
        this.newCell();
    },
    //右
    moveRight:function(){
        var i,j,k,n;
        for(i=0;i<4;i++){//从右至左遍历
            n=3;
            for(j=3;j>=0;j--){
                if(this.arr[i][j].value==0){
                    continue;
                }
                k=j+1;//不为0的格子向右移动一位
                a:
                while(k<=n){//判断是否符合移动条件
                    if(this.arr[i][j].value==0){
                        if(k==n||(this.arr[i][k+1].value!=0&&this.arr[i][k+1].value!=this.arr[i][j].value)){
                            this.moveCell(i,j,i,k);
                        }
                        k++;//为空则k指针继续右移
                    }else{
                        if(this.arr[i][k].value==this.arr[i][j].value){
                            this.mergeCell(i,j,i,k);
                            n--;    //向左缩小范围
                        }
                        break a;
                    }

                }
            }
        }
        this.newCell();
    },
    //上
    moveUP:function(){
        var i,j,k,n;
        for(j=0;j<4;j++){
            n=0;
            for(i=0;i<4;i++){
                if(this.arr[i][j].value==0){
                    continue;
                }
                k=i-1;
                a:
                while(k>=n){
                    if(this.arr[k][j].value==0){
                        if(k==n||(this.arr[k-1][j].value!=0&&this.arr[k-1][j].value!=this.arr[i][j].value)){
                            this.moveCell(i,j,k,j);
                        }
                        k--;
                    }else{
                        if(this.arr[k][j].value==this.arr[i][j].value){
                            this.mergeCell(i,j,k,j);
                            n++;
                        }
                         break a;
                    }
                }
            }
        }
        this.newCell();
    },
    //下
    moveDown:function(){//从下到上遍历
        var i,j,k,n;
        for(j=0;j<4;j++){
            n=3;
            for(i=3;i>=0;i--){
                if(this.arr[i][j].value==0){
                    continue;
                }
                k=i+1;//不为0的格子向下移动一位
                a:
                while(k<=n){//判断是否符合移动条件
                    if(this.arr[i][j].value==0){
                        if(k==n||(this.arr[k+1][j].value!=0&&this.arr[k+1][j].value!=this.arr[i][j].value)){
                            this.moveCell(i,j,k,j);
                        }
                        k++;//为空则k指针继续下移
                    }else{
                        if(this.arr[k][j].value==this.arr[i][j].value){
                            this.mergeCell(i,j,k,j);
                            n--;    //向上缩小范围
                        }
                        break a;
                    }

                }
            }
        }
        this.newCell();
    },
    //添加格子
    newCell:function(){
        var i,j,len,index;
        var ableArr=[];//保存遍历所提取的空格子位置的数组
        if(this.moveAble!=true){
            return
        }
        for (i=0;i<4;i++){
            for(j=0;j<4;j++){
                if(this.arr[i][j].value==0){
                    ableArr.push([i,j]);
                }
            }
        }
        len=ableArr.length;
        if(len>0){
            index=getRandom(len);//随机位置
            i=ableArr[index][0];
            j=ableArr[index][1];
            this.arrValueUpdate(2,i,j);
            this.drawCell(i,j);
        }else{return;}
    },
    //移动
    moveCell:function(i1,j1,i2,j2){
        this.arr[i2][j2].value==this.arr[i1][j1].value;
        this.arr[i1][j1].value==0;
        this.moveAble=true;
        $(".pos"+i1+j1).removeClass("pos"+i1+j1).addClass("pos"+i2+j2);



    },
    //合并
    mergeCell:function(i1,j1,i2,j2){
		var temp =this.arr[i2][j2].value;
		var temp1 = temp * 2;
		this.moveAble = true;
		this.arr[i2][j2].value = temp1;
		this.arr[i1][j1].value = 0;
		$(".pos"+i2+j2).addClass('toRemove');
		var theDom = $(".pos"+i1+j1).removeClass("pos"+i1+j1).addClass("pos"+i2+j2).find('.number_cell_con');
		setTimeout(function(){
			$(".toRemove").remove();
			theDom.addClass('n'+temp1).removeClass('n'+temp).find('span').html(temp1);
		},200);
		this.score += temp1;
		$("#score").html(this.score);	
		if(temp1 == 2048){
			alert('嚯，嫩牛逼呢！');
			this.init();
		}	
	},
    //判断输
    checkLose:function(){
        var i,j,temp;
        for(i=0;i<4;i++){
            for(j=0;j<4;j++){
                temp=this.arr[i][j].value;
                if(temp==0){
                    return false;
                }
                if(this.arr[i+1]&&(this.arr[i+1][j]==temp)){
                    return false;
                }
                if((this.arr[i][j+1]!=undefined)&&(this.arr[i][j+1].value==temp)){
                    return false;
                }
            }
        }
        alert('try again')
        this.init();
        return true;
    },

}


function getRandom(n){
    return Math.floor(Math.random()*n)
}
function Game2048(){
    this.addEvent();
}

var g= new Game2048;
g.init();