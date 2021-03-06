var db = require('./db');
var url = require('url');
var querystring = require('querystring');
var formidable = require('formidable');
var fs = require('fs')
module.exports = {
  //登录接口
  login(req,res){
    let data = req.query
    db.select(function(data){
      console.log(data)
      if(data.length !== 0){
        req.session.sessionData = data
        res.json({
          code: 200,
          data: data
        })
      }else{
        res.json({
          code: 500,
          data:'账户密码错误'
        })
      }
    },req.query)
  },
  //注册接口
  register(req,res){
    console.log(req.body)
    let sql = "insert into user values (0,'" + req.body.userName +"','" + req.body.pwd + "')"
    db.operateSql(sql,function(data){
      if(data.affectedRows){
        res.json({
          msg: '注册成功',
          code: 200
        })
      }else{
        res.json({
          msg:"注册失败",
          code: 500
        })
      }
    })
  },
  //上传图片接口
  upload(req,res){
    // var form = new formidable.IncomingForm()
    // // parse 方法，自动实现文件上传
    // form.parse(req, (err, fields, files) => {
    //     // fs.rename(files.avatar.path, '/' + files.avatar.name,(err)=>{
    //     //     console.log(err) 
    //     //     res.end()
    //     // })
    //     res.end()
    // })
    res.end()
  },
  //创建文章接口
  createArticle(req,res){
      console.log(req.body)
      let sql = "insert into article(author,title,cover,remark,category,user_id,add_time,content) values ('" + req.body.author +"','" + req.body.title+"','" + req.body.cover +"','" + req.body.remark + "'," + req.body.category + "," + req.body.user_id +  ",'" +  req.body.add_time + "','" +  req.body.content + "')"
      db.createArticeSql(sql,function(data){
        if(data.affectedRows){
          res.json({
            msg: '创建成功',
            code: 200
          })
        }else{
          res.json({
            msg:"创建失败",
            code: 500
          })
        }
      })
  },
  //查询文章
  getArticleList(req,res){
      let data = req.query; 
      db.getArtListSql(function(data){
        res.json({
            code: 200,
            data: data
          })
        // if(data.length !== 0){
        //     res.json({
        //       code: 200,
        //       data: data
        //     })
        //   }else{
        //     res.json({
        //       code: 500,
        //       data:'查询文章失败'
        //     })
        //   }
      },data)
  },
  
  getArticleListById(req,res){
      if(!req.session.sessionData){
        res.json({
            code: 1000,
            data: []
          })
        return
      }
    let data = req.query; 
    db.getArtListByIdSql(function(data){
      if(data.length !== 0){
          res.json({
            code: 200,
            data: data
          })
        }else{
          res.json({
            code: 200,
            data: []
          })
        }
    },data)
},
  //文章详情
  getArticleDetail(req,res){
    let data = req.query;
    db.getArtDetailSql(function(data){
      if(data.length !== 0){
          res.json({
            code: 200,
            data: data
          })
        }else{
          res.json({
            code: 500,
            data:'查询文章失败'
          })
        }
    },data)
  },
  //删除文章
  postDelArticleById(req,res){
    let data = req.body;
    db.postDelArticleSql(function(data){
        if(data.affectedRows){
            res.json({
              msg: '删除成功',
              code: 200
            })
          }else{
            res.json({
              msg:"删除失败",
              code: 500
            })
          }
      },data)
  },
  //更新文章
  postUpdateArt(req,res) {
    let data = req.body
    db.updateArtSql(function(data){
        if(data.affectedRows){
            res.json({
              msg: '修改成功',
              code: 200
            })
          }else{
            res.json({
              msg:"修改失败",
              code: 500
            })
          }
    },data)
  },
  //留言查询
  getRemarkList(req,res){
      let data = req.query
      db.getRemarkSql(function(data){
        if(data.length !== 0){
            res.json({
              code: 200,
              data: data
            })
          }else{
            res.json({
              code: 500,
              msg:'查询留言失败'
            })
          }
      },data)
  },
  //创建留言
  postCreateRemark(req,res){
      let data = req.body
      db.postCreateRemarkSql(function(data){
        if(data.affectedRows){
            res.json({
              msg: '留言成功',
              code: 200
            })
          }else{
            res.json({
              msg:"留言失败",
              code: 500
            })
          }
      },data)
  },
  //查询标签列表
  getLableList(req,res){
      let data = req.query
      db.getLableListSql(function(data){
        if(data.length !== 0){
            res.json({
              code: 200,
              data: data
            })
          }else{
            res.json({
              code: 500,
              msg:'查询标签失败'
            })
          }
      },data)
  },
  //新增标签
  postCreateLable(req,res){
      let data = req.body;
      db.createLableSql(function(data){
        if(data.affectedRows){
            res.json({
              msg: '创建成功',
              code: 200
            })
          }else{
            res.json({
              msg:"创建失败",
              code: 500
            })
          }
      },data)
  },
  //删除标签
  postDelLable(req,res){
      let data = req.body;
      db.delLableSql(function(data){
        if(data.affectedRows){
            res.json({
              msg: '删除成功',
              code: 200
            })
          }else{
            res.json({
              msg:"删除失败",
              code: 500
            })
          }
      },data)
  },
}