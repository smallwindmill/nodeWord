var fs = require('fs');
var moment = require('moment');
var admZip = require('adm-zip');
var filePath = __dirname+'\\CPT软件授权申请单.docx';
// console.log('dir',filePath);
// console.log('file list:',);
// console.log('text',contentXml);
__dirname = __dirname+'\\outport\\';
// console.log(__dirname);
var arr = fs.readdirSync(__dirname);
// console.log(fs.readdirSync(__dirname));

let len=0;
let len2=0;

var readline = require('readline');
var  rl = readline.createInterface(process.stdin, process.stdout);

/*rl.setPrompt('请输入保存文件夹名称> ');
rl.prompt();*/

var xx="已处理";
rl.question('请输入保存文件夹名称:', (answer) => {
  xx=answer;
  arr.forEach( function(ele, index) {
    // console.log(fs.statSync(__dirname+'\\'+ele).isFile());
    if(!(fs.statSync(__dirname+ele).isFile())){
      return false;}else{let o=1;}
    if(ele.split('.')[1].indexOf('doc')!=-1){
      console.log(ele);
      len++;
      readDocOutport(__dirname+ele,xx,index);
    }
  });
  rl.close();
  // console.log(len,len2);
});


function readDocOutport(filePath,xx){
  var str=[];
  var str2=[];
  var zip = new admZip(filePath);
  var contentXml = zip.readAsText('word/document.xml');
  contentXml.match(/<w:t>[\s\S]*?<\/w:t>/ig).forEach((item,index)=>{
    // str += item.slice(5,-6);
    // console.log(index);
    var i=item.slice(5,-6);
    str.push(i);
    str2.push(item);
  })

  let i={};
  var result={data:i};
  str.forEach( function(ele,index) {
    // let i={data:[]}.data;
   if(ele.indexOf('申请人')!=-1){i.申请人=str[index+3];}
   if(str[index].indexOf('使用人')!=-1){i.使用人=str[index+2];}
   if(str[index].indexOf('使用行政')!=-1){i.使用行政区域=str[index+3]+str[index+4];}
    // if(str[index].indexOf('试用')!=-1){i.是否试用=str[index+2]+str[index+3]+str[index+4]+str[index+5];}
    // if(str[index].indexOf('签订合同')!=-1){i.是否签订合同=str[index+2]+str[index+3]+str[index+4]+str[index+5];}
    if(str[index].indexOf('合同编号')!=-1){i.合同编号=str[index+1];}
    if(str[index].indexOf('授权信息')!=-1){i.申请码=str[index+6];}
    // if(str[index].indexOf('合同编号')!=-1){let i={str[index-1]+str[index]:str[index+1]};result.push(i);}
    // console.log(ele+str[index]);

    // if(str[index].indexOf('合同编号')!=-1){let i={str[index-1]+str[index]:str[index+1]};result.push(i);}
  });
  // console.log(moment().format('MMDD HHmmss d'));
  // 格式化时间
  fs.mkdir(__dirname+xx+'\\',()=>{});
  var pathFile = __dirname+xx+'\\'+filePath.split('\\')[filePath.split('\\').length-1].split('.')[0]+moment().format('-MMDDHHmmss');
  fs.exists(pathFile,(exists)=>{if(exists){console.log('文件已存在!');process.exit();}else{}})
  // console.log(str2);
  fs.writeFile(pathFile+'Origin.txt',str2,(err)=>{
      if(err) throw err;
  })
  // 保存原始解析文件
  // fs.writeFile(pathFile,JSON.stringify(JSON.parse(result)),(err)=>{
  fs.writeFile(pathFile+'.json',JSON.stringify(result),(err)=>{
    if(err) throw err;
    console.log('***********************\n');
    console.log("文件已成功保存至："+pathFile+'\n');
    // console.log(filePath);
    // console.log(index2,len,'***********************\n');
    len2++;
    conLog(len,len2);
  })
  // 保存json格式文件
}

function conLog(len,len2){
  if(len==len2){
    console.log('***********************\n');
  }
}
