(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{63:function(e,t,o){"use strict";o.r(t),o.d(t,"frontMatter",(function(){return r})),o.d(t,"metadata",(function(){return l})),o.d(t,"rightToc",(function(){return i})),o.d(t,"default",(function(){return b}));var n=o(2),s=o(6),a=(o(0),o(76)),r={id:"install",title:"Installation",slug:"/"},l={unversionedId:"install",id:"install",isDocsHomePage:!1,title:"Installation",description:"1. Install the shroom package",source:"@site/docs/install.md",slug:"/",permalink:"/shroom/docs/",editUrl:"https://github.com/jankuss/shroom/edit/master/docs/docs/install.md",version:"current",sidebar:"someSidebar",next:{title:"Create a room",permalink:"/shroom/docs/guides/create-room"}},i=[{value:"1. Install the shroom package",id:"1-install-the-shroom-package",children:[]},{value:"2. Install <code>swftools</code> (http://www.swftools.org/)",id:"2-install-swftools-httpwwwswftoolsorg",children:[]},{value:"3. Dump assets into your project",id:"3-dump-assets-into-your-project",children:[]},{value:"4. Create the Shroom instance",id:"4-create-the-shroom-instance",children:[]}],c={rightToc:i};function b(e){var t=e.components,o=Object(s.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},c,o,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h3",{id:"1-install-the-shroom-package"},"1. Install the shroom package"),Object(a.b)("p",null,"To install shroom in your project, use the following command."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{}),"npm install @jankuss/shroom pixi.js\n")),Object(a.b)("p",null,"If you are using ",Object(a.b)("inlineCode",{parentName:"p"},"yarn"),", you can use"),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{}),"yarn add @jankuss/shroom pixi.js\n")),Object(a.b)("h3",{id:"2-install-swftools-httpwwwswftoolsorg"},"2. Install ",Object(a.b)("inlineCode",{parentName:"h3"},"swftools")," (",Object(a.b)("a",Object(n.a)({parentName:"h3"},{href:"http://www.swftools.org/"}),"http://www.swftools.org/"),")"),Object(a.b)("p",null,"For the asset dumping process to work correctly, ",Object(a.b)("inlineCode",{parentName:"p"},"swftools")," needs to be installed in your system.\nDownload ",Object(a.b)("inlineCode",{parentName:"p"},"swftools")," ",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"http://www.swftools.org/download.html"}),"here")," and install it."),Object(a.b)("hr",null),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Notice:")," Please use one of the following versions of ",Object(a.b)("inlineCode",{parentName:"p"},"swftools"),", as they have been tested out and work. Other versions may not work correctly."),Object(a.b)("h4",{id:"windows"},"Windows"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"swftools 2013-04-09-1007")," ",Object(a.b)("a",Object(n.a)({parentName:"li"},{href:"http://www.swftools.org/swftools-2013-04-09-1007.exe"}),"http://www.swftools.org/swftools-2013-04-09-1007.exe"))),Object(a.b)("h4",{id:"linux"},"Linux"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"swftools 2013-04-09-1007")," ",Object(a.b)("a",Object(n.a)({parentName:"li"},{href:"http://www.swftools.org/swftools-2013-04-09-1007.tar.gz"}),"http://www.swftools.org/swftools-2013-04-09-1007.tar.gz")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"swftools 0.9.2")," ",Object(a.b)("a",Object(n.a)({parentName:"li"},{href:"http://www.swftools.org/swftools-0.9.2.tar.gz"}),"http://www.swftools.org/swftools-0.9.2.tar.gz"))),Object(a.b)("hr",null),Object(a.b)("p",null,"After installation, add the installation directory of ",Object(a.b)("inlineCode",{parentName:"p"},"swftools")," to your systems ",Object(a.b)("inlineCode",{parentName:"p"},"PATH")," variable.\nIn the end, the commands ",Object(a.b)("inlineCode",{parentName:"p"},"swfdump")," and ",Object(a.b)("inlineCode",{parentName:"p"},"swfextract")," should be callable from the command line.\nYou can check by running the following commands"),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{}),"swfdump --version\nswfextract --version\n")),Object(a.b)("p",null,"If this works, you can continue to the next step."),Object(a.b)("h3",{id:"3-dump-assets-into-your-project"},"3. Dump assets into your project"),Object(a.b)("p",null,"Run the following commands to dump the required assets into your project directory. This will take some time.\nThe ",Object(a.b)("inlineCode",{parentName:"p"},"--url")," option specifies the url to the external variables to use. The ",Object(a.b)("inlineCode",{parentName:"p"},"--location")," option specifies the location where the assets should get dumped into.\nYou can adjust both as needed."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{}),"npm install -g @jankuss/shroom\nshroom dump --url https://www.habbo.com/gamedata/external_variables/326b0a1abf9e2571d541ac05e6eb3173b83bddea --location ./public/resources\n")),Object(a.b)("p",null,"You will need to serve the created ",Object(a.b)("inlineCode",{parentName:"p"},"resources")," folder with a http server, so shroom can access the required assets."),Object(a.b)("h3",{id:"4-create-the-shroom-instance"},"4. Create the Shroom instance"),Object(a.b)("p",null,"Lastly, in your code, import and initialize the Shroom instance."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),'import * as PIXI from "pixi.js";\nimport { Shroom } from "@jankuss/shroom";\n\nconst view = document.querySelector("#root") as HTMLCanvasElement;\nconst application = new PIXI.Application({ view });\n\n// Assuming the resources are available under http://localhost:8080/resources\nconst shroom = Shroom.create({ application, resourcePath: "./resources" });\n')),Object(a.b)("p",null,"Now, you are fully ready to use shroom.\nCheck out the ",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"/shroom/docs/guides/create-room"}),"Guides")," section to learn how to use shroom."),Object(a.b)("p",null,"Also, take a look at the ",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/jankuss/shroom/tree/master/example"}),"example project")," in the shroom repository for a basic project depending on shroom.\nYou can use it as a boilerplate for your own."))}b.isMDXComponent=!0}}]);