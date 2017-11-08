define({ "api": [
  {
    "type": "get",
    "url": "/app/:appName",
    "title": "4.详情",
    "version": "0.0.1",
    "name": "Application_Detail",
    "group": "Application",
    "description": "<p>获取应用详情，尚未完成</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "appName",
            "description": "<p>应用名</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-TOKEN",
            "description": "<p>登录所获取的应用操作权限</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timeStamp",
            "description": "<p>处理结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>请求开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>返回结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.account",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.userId",
            "description": "<p>用户Id</p>"
          }
        ]
      }
    },
    "filename": "BunnyDB/app.js",
    "groupTitle": "Application",
    "sampleRequest": [
      {
        "url": "https://bunnydb.changeden.net/app/:appName"
      }
    ]
  },
  {
    "type": "get",
    "url": "/app/",
    "title": "3.列表",
    "version": "0.0.1",
    "name": "Application_List",
    "group": "Application",
    "description": "<p>获取应用列表</p>",
    "examples": [
      {
        "title": "例子:",
        "content": "curl GET https://bunnydb.changeden.net/app/",
        "type": "json"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-TOKEN",
            "description": "<p>登录所获取的应用操作权限</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timeStamp",
            "description": "<p>处理结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>请求开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>返回结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.userId",
            "description": "<p>用户Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result.list",
            "description": "<p>应用列表</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.list.appId",
            "description": "<p>应用Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.list.name",
            "description": "<p>应用名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.list.appKey",
            "description": "<p>应用操作码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.list.appSecret",
            "description": "<p>应用最高权限码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.list.creatorId",
            "description": "<p>应用创建者Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.list.status",
            "description": "<p>应用状态</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "result.list.createAt",
            "description": "<p>应用创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "result.list.updateAt",
            "description": "<p>应用更新时间</p>"
          }
        ]
      }
    },
    "filename": "BunnyDB/app.js",
    "groupTitle": "Application",
    "sampleRequest": [
      {
        "url": "https://bunnydb.changeden.net/app/"
      }
    ]
  },
  {
    "type": "put",
    "url": "/app/",
    "title": "1.创建",
    "version": "0.0.1",
    "name": "Create_Application",
    "group": "Application",
    "description": "<p>创建应用</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "appName",
            "description": "<p>应用名</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-TOKEN",
            "description": "<p>登录所获取的应用操作权限</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timeStamp",
            "description": "<p>处理结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>请求开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>返回结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.userId",
            "description": "<p>用户Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.application",
            "description": "<p>用户Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.application.appId",
            "description": "<p>应用Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.application.appName",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.application.appKey",
            "description": "<p>应用操作码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.application.appSecret",
            "description": "<p>应用最高权限码</p>"
          }
        ]
      }
    },
    "filename": "BunnyDB/app.js",
    "groupTitle": "Application",
    "sampleRequest": [
      {
        "url": "https://bunnydb.changeden.net/app/"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/app/:appId",
    "title": "5.删除",
    "version": "0.0.1",
    "name": "Delete_Application",
    "group": "Application",
    "description": "<p>删除应用，尚未完成</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "appId",
            "description": "<p>应用Id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-TOKEN",
            "description": "<p>登录所获取的应用操作权限</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timeStamp",
            "description": "<p>处理结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>请求开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>返回结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.userId",
            "description": "<p>用户Id</p>"
          }
        ]
      }
    },
    "filename": "BunnyDB/app.js",
    "groupTitle": "Application",
    "sampleRequest": [
      {
        "url": "https://bunnydb.changeden.net/app/:appId"
      }
    ]
  },
  {
    "type": "put",
    "url": "/app/:appId",
    "title": "2.修改",
    "version": "0.0.1",
    "name": "Update_Application",
    "group": "Application",
    "description": "<p>修改应用</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "appId",
            "description": "<p>应用Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "appName",
            "description": "<p>应用名</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-TOKEN",
            "description": "<p>登录所获取的应用操作权限</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timeStamp",
            "description": "<p>处理结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>请求开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>返回结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.appId",
            "description": "<p>应用Id</p>"
          }
        ]
      }
    },
    "filename": "BunnyDB/app.js",
    "groupTitle": "Application",
    "sampleRequest": [
      {
        "url": "https://bunnydb.changeden.net/app/:appId"
      }
    ]
  },
  {
    "type": "put",
    "url": "/class/",
    "title": "1.添加",
    "version": "0.0.1",
    "name": "Create_Class",
    "group": "Class",
    "description": "<p>在某应用中添加一个类</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "className",
            "description": "<p>类名</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-ID",
            "description": "<p>应用Id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-KEY",
            "description": "<p>应用操作码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timeStamp",
            "description": "<p>处理结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>请求开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>返回结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.userId",
            "description": "<p>用户Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.classInfo",
            "description": "<p>类详情</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.classInfo.classId",
            "description": "<p>类Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.classInfo.className",
            "description": "<p>类名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.classInfo.appId",
            "description": "<p>所属应用Id</p>"
          }
        ]
      }
    },
    "filename": "BunnyDB/classes.js",
    "groupTitle": "Class",
    "sampleRequest": [
      {
        "url": "https://bunnydb.changeden.net/class/"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/class/:classId",
    "title": "3.删除",
    "version": "0.0.1",
    "name": "Delete_Class",
    "group": "Class",
    "description": "<p>删除某个类</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "classId",
            "description": "<p>类Id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-ID",
            "description": "<p>应用Id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-KEY",
            "description": "<p>应用操作码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timeStamp",
            "description": "<p>处理结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>请求开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>返回结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.userId",
            "description": "<p>用户Id</p>"
          }
        ]
      }
    },
    "filename": "BunnyDB/classes.js",
    "groupTitle": "Class",
    "sampleRequest": [
      {
        "url": "https://bunnydb.changeden.net/class/:classId"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/class/key/:classId",
    "title": "3.删除键",
    "version": "0.0.1",
    "name": "Delete_Key_For_Class",
    "group": "Class",
    "description": "<p>删除某个类</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "classId",
            "description": "<p>类Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "objectKey",
            "description": "<p>键</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-ID",
            "description": "<p>应用Id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-KEY",
            "description": "<p>应用操作码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timeStamp",
            "description": "<p>处理结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>请求开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>返回结果</p>"
          }
        ]
      }
    },
    "filename": "BunnyDB/classes.js",
    "groupTitle": "Class",
    "sampleRequest": [
      {
        "url": "https://bunnydb.changeden.net/class/key/:classId"
      }
    ]
  },
  {
    "type": "get",
    "url": "/class/",
    "title": "4.列表",
    "version": "0.0.1",
    "name": "Fetch_Class",
    "group": "Class",
    "description": "<p>获取某个应用中的类列表</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-ID",
            "description": "<p>应用Id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-KEY",
            "description": "<p>应用操作码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timeStamp",
            "description": "<p>处理结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>请求开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>返回结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.userId",
            "description": "<p>用户Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.list",
            "description": "<p>类集合</p>"
          }
        ]
      }
    },
    "filename": "BunnyDB/classes.js",
    "groupTitle": "Class",
    "sampleRequest": [
      {
        "url": "https://bunnydb.changeden.net/class/"
      }
    ]
  },
  {
    "type": "put",
    "url": "/class/:classId",
    "title": "2.修改",
    "version": "0.0.1",
    "name": "Update_Class",
    "group": "Class",
    "description": "<p>修改某个类的类名</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "classId",
            "description": "<p>类Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "className",
            "description": "<p>新类名</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-ID",
            "description": "<p>应用Id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-KEY",
            "description": "<p>应用操作码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timeStamp",
            "description": "<p>处理结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>请求开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>返回结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.userId",
            "description": "<p>用户Id</p>"
          }
        ]
      }
    },
    "filename": "BunnyDB/classes.js",
    "groupTitle": "Class",
    "sampleRequest": [
      {
        "url": "https://bunnydb.changeden.net/class/:classId"
      }
    ]
  },
  {
    "type": "put",
    "url": "/class/key/:classId",
    "title": "5.修改键",
    "version": "0.0.1",
    "name": "Update_Key_For_Class",
    "group": "Class",
    "description": "<p>删除某个类</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "classId",
            "description": "<p>类Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fromKey",
            "description": "<p>原始Key</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "toKey",
            "description": "<p>新Key</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-ID",
            "description": "<p>应用Id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-KEY",
            "description": "<p>应用操作码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timeStamp",
            "description": "<p>处理结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>请求开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>返回结果</p>"
          }
        ]
      }
    },
    "filename": "BunnyDB/classes.js",
    "groupTitle": "Class",
    "sampleRequest": [
      {
        "url": "https://bunnydb.changeden.net/class/key/:classId"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/object/id/:objectId",
    "title": "3.删除",
    "version": "0.0.1",
    "name": "Delete_Class",
    "group": "Object",
    "description": "<p>删除某个记录</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "objectId",
            "description": "<p>记录Id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-ID",
            "description": "<p>应用Id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-KEY",
            "description": "<p>应用操作码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timeStamp",
            "description": "<p>处理结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>请求开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>返回结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.userId",
            "description": "<p>用户Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.objectId",
            "description": "<p>记录Id</p>"
          }
        ]
      }
    },
    "filename": "BunnyDB/object.js",
    "groupTitle": "Object",
    "sampleRequest": [
      {
        "url": "https://bunnydb.changeden.net/object/id/:objectId"
      }
    ]
  },
  {
    "type": "put",
    "url": "/object/id/:objectId",
    "title": "5.详情",
    "version": "0.0.1",
    "name": "Fetch_Object_Detail",
    "group": "Object",
    "description": "<p>删除某个类</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "objectId",
            "description": "<p>类Id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-ID",
            "description": "<p>应用Id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-KEY",
            "description": "<p>应用操作码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timeStamp",
            "description": "<p>处理结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>请求开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>返回结果</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.object",
            "description": "<p>记录详情</p>"
          }
        ]
      }
    },
    "filename": "BunnyDB/object.js",
    "groupTitle": "Object",
    "sampleRequest": [
      {
        "url": "https://bunnydb.changeden.net/object/id/:objectId"
      }
    ]
  },
  {
    "type": "get",
    "url": "/object/:classId",
    "title": "4.列表",
    "version": "0.0.1",
    "name": "Fetch_Object_List",
    "group": "Object",
    "description": "<p>获取某个类的记录列表</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "classId",
            "description": "<p>类Id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-ID",
            "description": "<p>应用Id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-KEY",
            "description": "<p>应用操作码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timeStamp",
            "description": "<p>处理结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>请求开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>返回结果</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.list",
            "description": "<p>记录集合</p>"
          }
        ]
      }
    },
    "filename": "BunnyDB/object.js",
    "groupTitle": "Object",
    "sampleRequest": [
      {
        "url": "https://bunnydb.changeden.net/object/:classId"
      }
    ]
  },
  {
    "type": "post",
    "url": "/object/:classId",
    "title": "1.添加",
    "version": "0.0.1",
    "name": "Insert_Object",
    "group": "Object",
    "description": "<p>在某个类中添加记录</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "classId",
            "description": "<p>类Id</p>"
          }
        ],
        "Request-Body": [
          {
            "group": "Request-Body",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>value</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-ID",
            "description": "<p>应用Id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-KEY",
            "description": "<p>应用操作码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timeStamp",
            "description": "<p>处理结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>请求开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>返回结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.userId",
            "description": "<p>用户Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.objectId",
            "description": "<p>记录Id</p>"
          }
        ]
      }
    },
    "filename": "BunnyDB/object.js",
    "groupTitle": "Object",
    "sampleRequest": [
      {
        "url": "https://bunnydb.changeden.net/object/:classId"
      }
    ]
  },
  {
    "type": "put",
    "url": "/object/:objectId",
    "title": "2.修改",
    "version": "0.0.1",
    "name": "Update_Object",
    "group": "Object",
    "description": "<p>修改某个记录</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "objectId",
            "description": "<p>记录Id</p>"
          }
        ],
        "Request-Body": [
          {
            "group": "Request-Body",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>value</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-ID",
            "description": "<p>应用Id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-APP-KEY",
            "description": "<p>应用操作码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timeStamp",
            "description": "<p>处理结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>请求开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>返回结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.userId",
            "description": "<p>用户Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.objectId",
            "description": "<p>记录Id</p>"
          }
        ]
      }
    },
    "filename": "BunnyDB/object.js",
    "groupTitle": "Object",
    "sampleRequest": [
      {
        "url": "https://bunnydb.changeden.net/object/:objectId"
      }
    ]
  },
  {
    "type": "get",
    "url": "/user/:account",
    "title": "1.用户名检测",
    "version": "0.0.1",
    "name": "Check_Account",
    "group": "User",
    "description": "<p>检测用户名是否被占用</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>用户名</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "例子:",
        "content": "curl GET https://bunnydb.changeden.net/user/changeden",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timeStamp",
            "description": "<p>处理结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>请求开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>返回结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.account",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "result.valid",
            "description": "<p>用户名是否有效</p>"
          }
        ]
      }
    },
    "filename": "BunnyDB/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://bunnydb.changeden.net/user/:account"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/",
    "title": "3.登录",
    "version": "0.0.1",
    "name": "Sign_In",
    "group": "User",
    "description": "<p>用户登录</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>用户密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timeStamp",
            "description": "<p>处理结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>请求开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>返回结果</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.user",
            "description": "<p>用户资料</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.user.userId",
            "description": "<p>用户Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.user.account",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "result.user.createAt",
            "description": "<p>用户注册时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "result.user.updateAt",
            "description": "<p>用户资料更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.accessToken",
            "description": "<p>应用操作权限</p>"
          }
        ]
      }
    },
    "filename": "BunnyDB/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://bunnydb.changeden.net/user/"
      }
    ]
  },
  {
    "type": "put",
    "url": "/user/",
    "title": "2.注册",
    "version": "0.0.1",
    "name": "Sign_Up",
    "group": "User",
    "description": "<p>用户注册</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>用户密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timeStamp",
            "description": "<p>处理结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>请求开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>返回结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.account",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.userId",
            "description": "<p>用户Id</p>"
          }
        ]
      }
    },
    "filename": "BunnyDB/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://bunnydb.changeden.net/user/"
      }
    ]
  }
] });
