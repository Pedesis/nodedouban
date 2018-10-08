//https://movie.douban.com/tag/%E7%94%B5%E8%A7%86%E5%89%A7%20%E9%9F%A9%E5%89%A7?type=
//此为韩国电视剧爬取
"use strict"
const request = require("request");//下载网页
const cheerio = require("cheerio");//解析网页数据
//保存电影信息的类
//分别是 电影名 评分 评论人数 misc为日期/国家/分类/导演等  封面图片地址
function Movie() {
    this.name = "";
    this.score = 0;
    this.commts = 0;
    this.misc = "";
    this.coverUrl = "";
}
//封装console.log
const log = function () {
    console.log.apply(console, arguments);
}
const movies = [];
const moviesFromUrl = function (url) {
    request(url, function (error, response, body) {
        if (error === null && response.statusCode == 200) {
            const e = cheerio.load(body);
            
            const movieDivs = e(".item");
            for(let i=0;i<movieDivs.length;i++){
                let element=movieDivs[i];
                const div=e(element).html();
                const m=movieFromDiv(div);
                movies.push(m);
            }
            saveMovie(movies);
        } else {
            log("请求失败", error,response.statusCode);
        }
    })
}

const movieFromDiv = function (div) {
    const movie=new Movie();
    const e=cheerio.load(div);
    movie.name=e(".pl2>a").text();
    movie.score=e(".star .rating_nums").text();
    movie.commts=e(".star>.pl").text();
    movie.misc=e(".pl2>.pl").text();
    const pic=e(".nbg");
    movie.coverUrl=pic.find("img").attr("src");
    return movie;
}
const saveMovie=function(movies){
    const fs=require("fs");
    const path="korea.txt";
    const s=JSON.stringify(movies,null,2);
    fs.writeFile(path,s,function(error){
        if(error!=null){
            log("写入错误",error);
        }else{
            log("保存成功");
        }
    })
}

var _main=function(){
    const  url = "https://movie.douban.com/tag/%E7%94%B5%E8%A7%86%E5%89%A7%20%E9%9F%A9%E5%89%A7?start=";
    for(let i=0;i<1001;i+=20){
    const  urlAll=url+i;
        moviesFromUrl(urlAll);
    }
    
}
_main();
