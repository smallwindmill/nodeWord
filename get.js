var fs = require('fs');
var mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password: '@123456',
  database: 'CPTGuest',
  multipleStatements: true
});

mysqlConnection.connect();
mysqlConnection.query("create table if not exists `doubanMovie`(`id` int auto_increment,`title` varchar(255),`titleEnglish` varchar(255),`titleOther` varchar(255),`info` int(6),`viewNumber` int(100),`quote` varchar(255),primary key(`id`))engine=InnoDB default charset=utf8;",(err,res)=>{
  if(err){console.log(err);return;}console.log('创建成功');
  // console.log(res);
});
mysqlConnection.query("alter table doubanMovie modify `info` varchar(6);alter table doubanMovie modify `viewNumber` varchar(100);",(err,res)=>{if(err){console.log(err);return;}});
// 修改表结构



var len="";
fs.readFile(__dirname+'/douban.json',function(err,data){
  if(err){console.log(err)}
  len=JSON.parse(data.toString());
  // console.log(len);
  readData(len);
})
// 读取json文件的数据


var readData=()=>{
  // var ll='&nbsp;'+'/&nbsp;';
  var i = JSON.parse(JSON.stringify(len.data).replace(new RegExp('&nbsp;/&nbsp;', 'g'),'').replace(/人评价/g,'').replace(new RegExp('/', 'g'),''));
  // var i = JSON.parse(JSON.stringify(len.data).replace('&nbsp;/&nbsp;','').replace('人评价',''));
// .replace('&nbsp;/&nbsp;','')
  console.log(i);
  var res=[];
  mysqlConnection.query("delete from doubanMovie",(err,res)=>{if(err){console.log(err)}});
  // 清空原有数据
  i.forEach((index)=>{
    // if(index.categories==8){res.push(index);}
    var lenQuery = [,index.title,index.titleEnglish,index.titleOther,index.info,index.viewNumber,index.quote];
    mysqlConnection.query("insert into doubanMovie values(?,?,?,?,?,?,?);",lenQuery,(err,res)=>{
      if(err){
        console.log(err);return;
      }
      // console.log(res);
    })
    // 插入读取的数据
  })
// process.exit();
}
  console.log('success');
/*
var arr=[];
var res={'data':arr};
$('.grid-16-8 ol li').each(function(i){
  var len={};
  len.numId = (i+1);
  len.title=$(this).find('.item .hd a span').eq(0).html();
  len.titleEnglish=$(this).find('.item .hd a span').eq(1).html();
  len.titleOther=$(this).find('.item .hd a span').eq(2).html();
  len.info = $(this).find('.item .bd .star .rating_num').eq(0).html();
  len.viewNumber = $(this).find('.item .bd .star span').eq(3).html();
  len.quote = $(this).find('.item .bd p.quote span').eq(0).html();
  arr.push(len);
})

document.write(JSON.stringify(res)); */
