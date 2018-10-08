var nameData=[];
var scoreData=[];
var timeData=[];
var hightData=[];
var data=function(lHandler){
    for(var i=0;i<lHandler.length;i++){
    var nameSplit=lHandler[i].name.replace(/[ ]/g, "").replace(/[\n]/g, "");
    nameData.push(nameSplit.split("/")[0]);
    scoreData.push(lHandler[i].score);
    timeData.push(lHandler[i].misc.slice(0,4));
    //log(timeData);
    
    }
}

//获取score,9 8 7 6 <6的数量
//豆瓣评分分布
var scoreDataAnlysis=function(){
    var scoreDataNumber=[0,0,0,0,0];
    for(var i=0;i<scoreData.length;i++){
        var sd=parseFloat(scoreData[i]);
        //获取的数据中有NaN;
        if(!isNaN(sd)){
            
            if(sd<6){
                //scoreDataNumber[0]刚开始为undefined
                scoreDataNumber[0]+=1;    
            }else if(6<=sd&&sd<7){
                scoreDataNumber[1]+=1;
            }else if(7<=sd&&sd<8){
                scoreDataNumber[2]+=1;
            }else if(8<=sd&&sd<9){
                scoreDataNumber[3]+=1;
            }else if(9<=sd&&sd<10){
                scoreDataNumber[4]+=1;
                hightData.push(i);
            }
        }
        }
    
    return  scoreDataNumber;
}
//时间分布
var timeDataAnlysis=function(){
    var timeDataNumber=[0,0,0,0,0,0];
    for(var i=0;i<timeData.length;i++){
        var td=parseInt(timeData[i]);
        if(!isNaN(td)){
            switch(td){
                case 2018:
                timeDataNumber[0]+=1;
                break;
                case 2017:
                timeDataNumber[1]+=1;
                break;
                case 2016:
                timeDataNumber[2]+=1;
                break;
                case 2015:
                timeDataNumber[3]+=1;
                break;
                case 2014:
                timeDataNumber[4]+=1;
                break;
                default:
                timeDataNumber[5]+=1;
                break;
            }
        }
        
    }
    return  timeDataNumber;
}

//最高分的电视剧
/*评分超过9分的电视剧为
住在清潭洞
心里的声音
未生
特殊失踪专案组：失踪的黑色M
信号
我亲爱的朋友们
请回答1997
第五共和国
请回答1988
六龙飞天
人生真美丽
爆笑虫子第三季
家门的荣光
*/
data(lHandler);

