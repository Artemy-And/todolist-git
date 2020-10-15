(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{104:function(t,e,a){},105:function(t,e,a){},128:function(t,e,a){"use strict";a.r(e);var n=a(0),i=a.n(n),o=a(8),l=a.n(o);a(104),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(105);var s,r,c=a(172),d=a(173),u=a(165),m=a(130),f=a(168),b=a(175),p=a(176),g=a(174),k=a(14),v=a(29),h=a(179),E=a(80),C=a.n(E).a.create({withCredentials:!0,baseURL:"https://social-network.samuraijs.com/api/1.1/",headers:{"API-KEY":"53444f05-2fd9-4762-9034-1b37fffb3067"}}),j=function(){return C.get("todo-lists/")},O=function(t){return C.post("todo-lists/",{title:t})},T=function(t){return C.delete("todo-lists/".concat(t))},y=function(t,e){return C.put("todo-lists/".concat(t),{title:e})},I=function(t){return C.get("todo-lists/".concat(t,"/tasks"))},A=function(t,e){return C.post("todo-lists/".concat(t,"/tasks"),{title:e})},w=function(t,e){return C.delete("todo-lists/".concat(t,"/tasks/").concat(e))},S=function(t,e,a){return C.put("todo-lists/".concat(t,"/tasks/").concat(e),a)},L=function(){return C.get("auth/me")},x=function(t){return C.post("auth/login",t)},F=function(){return C.delete("auth/login")};!function(t){t[t.New=0]="New",t[t.inProgress=1]="inProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(s||(s={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(r||(r={}));var P=a(26),D=Object(P.b)({name:"app",initialState:{status:"idle",error:null,isInitialized:!1},reducers:{setAppErrorAC:function(t,e){t.error=e.payload.error},setAppStatusAC:function(t,e){t.status=e.payload.status},setInitializedAC:function(t,e){t.isInitialized=e.payload.value}}}),N=D.actions.setAppErrorAC,z=D.actions.setAppStatusAC,R=D.actions.setInitializedAC,M=D.reducer,U=(Object(h.a)(),Object(h.a)(),Object(P.b)({name:"todolists",initialState:[],reducers:{removeTodolistAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));a>-1&&t.splice(a,1)},addTodolistAC:function(t,e){t.unshift(Object(v.a)(Object(v.a)({},e.payload.todolist),{},{filter:"all",entityStatus:"idle"}))},changeTodolistTitleAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].title=e.payload.title},changeTodolistFilterAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].filter=e.payload.filter},setTodilistAC:function(t,e){return e.payload.todoList.map((function(t){return Object(v.a)(Object(v.a)({},t),{},{filter:"all",entityStatus:"idle"})}))},changeTodilistEntitiyStatusAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].entityStatus=e.payload.entityStatus}}})),B=U.reducer,H=U.actions.removeTodolistAC,Z=U.actions.addTodolistAC,q=U.actions.changeTodolistTitleAC,J=U.actions.changeTodolistFilterAC,K=U.actions.setTodilistAC,W=U.actions.changeTodilistEntitiyStatusAC,$=function(t,e){if(t.messages.length){var a=t.messages[0];e(N({error:a}))}else e(N({error:"some error occured"})),e(z({status:"failed"}))},_=function(t,e){e(N({error:t.message?t.message:"some error was occured"})),e(z({status:"failed"}))},V=Object(P.b)({name:"tasks",initialState:{},reducers:{removeTaskAC:function(t,e){var a=t[e.payload.todolistId],n=a.findIndex((function(t){return t.id===e.payload.taskId}));n>-1&&a.splice(n,1)},addTaskAC:function(t,e){t[e.payload.task.todoListId].unshift(e.payload.task)},updateTaskAC:function(t,e){var a=t[e.payload.todolistId],n=a.findIndex((function(t){return t.id===e.payload.taskId}));n>-1&&(a[n]=Object(v.a)(Object(v.a)({},a[n]),e.payload.model))},setTaskAC:function(t,e){t[e.payload.todoListId]=e.payload.tasks}},extraReducers:function(t){t.addCase(Z,(function(t,e){t[e.payload.todolist.id]=[]})),t.addCase(H,(function(t,e){delete t[e.payload.id]})),t.addCase(K,(function(t,e){e.payload.todoList.forEach((function(e){t[e.id]=[]}))}))}}),X=V.reducer,Y=V.actions.removeTaskAC,G=V.actions.addTaskAC,Q=V.actions.updateTaskAC,tt=V.actions.setTaskAC,et=function(t,e,a){return function(n,i){var o=i().tasks[a].find((function(t){return t.id}));if(o){var l=Object(v.a)({deadline:o.deadline,description:o.description,priority:o.priority,startDate:o.startDate,title:o.title,status:o.status},e);S(a,t,l).then((function(i){if(0===i.data.resultCode){var o=Q({taskId:t,model:e,todolistId:a});n(o)}else $(i.data,n)})).catch((function(t){_(t,n)}))}else console.warn("\u0442\u0430\u0441\u043a\u0430 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u0430")}},at=a(169),nt=a(45),it=a(177),ot=a(166),lt=i.a.memo((function(t){console.log("add item form");var e=Object(n.useState)(""),a=Object(nt.a)(e,2),o=a[0],l=a[1],s=Object(n.useState)(null),r=Object(nt.a)(s,2),c=r[0],d=r[1],m=function(){""!==o.trim()?(t.addItem(o),l("")):d("Title is required")},f=Object(n.useCallback)((function(t){l(t.currentTarget.value)}),[]),b=Object(n.useCallback)((function(t){null!==c&&d(null),13===t.charCode&&m()}),[]);return i.a.createElement("div",null,i.a.createElement(it.a,{variant:"outlined",value:o,disabled:t.disabled,onChange:f,onKeyPress:b,error:!!c,label:"Title",helperText:c}),i.a.createElement(u.a,{color:"primary",onClick:m,disabled:t.disabled},i.a.createElement(ot.a,null),"!"))})),st=a(129),rt=a(87),ct=i.a.memo((function(t){console.log("Ediable span");var e=Object(n.useState)(!1),a=Object(nt.a)(e,2),o=a[0],l=a[1],s=Object(n.useState)(t.title),r=Object(nt.a)(s,2),c=r[0],d=r[1];return o?i.a.createElement(it.a,{variant:"outlined",value:c,onChange:function(t){d(t.currentTarget.value)},autoFocus:!0,onBlur:function(){l(!1),t.saveTitle(c),d("")}}):i.a.createElement("span",{onDoubleClick:function(){l(!0)}},t.title)})),dt=a(167),ut=a(180),mt=i.a.memo((function(t){var e=Object(n.useCallback)((function(e){t.changeTaskTitle(t.tasks.id,e,t.taskId)}),[t.changeTaskTitle,t.tasks.id,t.taskId]);return i.a.createElement("div",{key:t.tasks.id,className:t.tasks.status===s.Completed?"is-done":""},i.a.createElement(ut.a,{color:"primary",onChange:function(e){var a=e.currentTarget.checked;t.changeTaskStatus(t.tasks.id,a?s.Completed:s.New,t.taskId)},checked:t.tasks.status===s.Completed}),i.a.createElement(ct,{title:t.tasks.title,saveTitle:e}),i.a.createElement(u.a,{onClick:function(){return t.removeTask(t.tasks.id,t.taskId)}},i.a.createElement(dt.a,null)))})),ft=i.a.memo((function(t){var e=t.demo,a=void 0!==e&&e,o=Object(rt.a)(t,["demo"]);console.log("todolist");var l=Object(k.b)();Object(n.useEffect)((function(){var t;a||l((t=o.todolist.id,function(e){e(z({status:"loading"})),I(t).then((function(a){e(tt({tasks:a.data.items,todoListId:t})),e(z({status:"succeeded"}))}))}))}),[]);var r=Object(n.useCallback)((function(t){o.addTask(t,o.todolist.id)}),[o.addTask,o.todolist.id]),c=Object(n.useCallback)((function(){return o.changeFilter("all",o.todolist.id)}),[o.changeFilter,o.todolist.id]),d=Object(n.useCallback)((function(){return o.changeFilter("active",o.todolist.id)}),[o.changeFilter,o.todolist.id]),m=Object(n.useCallback)((function(){return o.changeFilter("completed",o.todolist.id)}),[o.changeFilter,o.todolist.id]),b=Object(n.useCallback)((function(){return o.removeTodolist(o.todolist.id)}),[o.removeTodolist,o.todolist.id]),p=Object(n.useCallback)((function(t){o.ChangeTOD(t,o.todolist.id)}),[o.todolist.id]),g=o.tasks;return"active"===o.todolist.filter&&(g=o.tasks.filter((function(t){return t.status===s.New}))),"completed"===o.todolist.filter&&(g=o.tasks.filter((function(t){return t.status===s.Completed}))),i.a.createElement("div",null,i.a.createElement("h3",null,i.a.createElement(ct,{title:o.todolist.title,saveTitle:p}),i.a.createElement(u.a,{onClick:b,disabled:"loading"===o.todolist.entityStatus},i.a.createElement(dt.a,null))),i.a.createElement(lt,{addItem:r,disabled:"loading"===o.todolist.entityStatus}),i.a.createElement("div",null,g.map((function(t){return i.a.createElement(mt,{changeTaskTitle:o.changeTaskTitle,changeTaskStatus:o.changeTaskStatus,removeTask:o.removeTask,tasks:t,taskId:o.todolist.id,key:t.id})}))),i.a.createElement("div",null,i.a.createElement(f.a,{variant:"all"===o.todolist.filter?"contained":"text",onClick:c,color:"inherit"},"All"),i.a.createElement(f.a,{variant:"active"===o.todolist.filter?"contained":"text",onClick:d,color:"primary"},"Active"),i.a.createElement(f.a,{variant:"completed"===o.todolist.filter?"contained":"text",onClick:m,color:"secondary"},"Completed")))})),bt=a(13),pt=function(t){var e=t.demo,a=void 0!==e&&e,o=Object(k.b)(),l=Object(k.c)((function(t){return t.todolists})),s=Object(k.c)((function(t){return t.tasks})),r=Object(k.c)((function(t){return t.auth.isLoggedIn}));Object(k.c)((function(t){return t.app.isInitialized}));Object(n.useEffect)((function(){!a&&r&&o((function(t){t(z({status:"loading"})),j().then((function(e){t(K({todoList:e.data})),t(z({status:"succeeded"}))})).catch((function(e){t(N(e.message)),t(z({status:"failed"}))}))}))}),[]);var c=Object(n.useCallback)((function(t,e){var a,n;o((a=t,n=e,function(t){t(z({status:"loading"})),w(n,a).then((function(e){t(Y({taskId:a,todolistId:n})),t(z({status:"succeeded"}))}))}))}),[o]),d=Object(n.useCallback)((function(t,e){o(function(t,e){return function(a){a(z({status:"loading"})),A(e,t).then((function(t){if(0===t.data.resultCode){var e=t.data.data.item,n=G({task:e});a(n),a(z({status:"succeeded"}))}else if(t.data.messages.length){var i=t.data.messages[0];a(N({error:i}))}else a(N({error:"some error occured"})),a(z({status:"failed"}))})).catch((function(t){a(N(t.message)),a(z({status:"failed"}))}))}}(t,e))}),[o]),u=Object(n.useCallback)((function(t,e,a){var n=et(t,{status:e},a);o(n)}),[o]),m=Object(n.useCallback)((function(t,e,a){var n=et(t,{title:e},a);o(n)}),[o]),f=Object(n.useCallback)((function(t,e){var a,n,i=(a=e,n=t,function(t){y(a,n).then((function(e){t(q({id:a,title:n}))}))});o(i)}),[o]),b=Object(n.useCallback)((function(t,e){o(J({filter:t,id:e}))}),[o]),p=Object(n.useCallback)((function(t){var e;o((e=t,function(t){t(z({status:"loading"})),t(W({id:e,entityStatus:"loading"})),T(e).then((function(a){t(H({id:e})),t(z({status:"succeeded"}))}))}))}),[o]),g=Object(n.useCallback)((function(t){o(function(t){return function(e){e(z({status:"loading"})),O(t).then((function(t){e(Z({todolist:t.data.data.item})),e(z({status:"succeeded"}))}))}}(t))}),[o]);return r?i.a.createElement(i.a.Fragment,null," ",i.a.createElement(at.a,{container:!0,style:{padding:"10px"}},i.a.createElement(lt,{addItem:g})),i.a.createElement(at.a,{container:!0,spacing:3},l.map((function(t){var e=s[t.id];return i.a.createElement(at.a,{item:!0},i.a.createElement(st.a,{style:{padding:"10px"}},i.a.createElement(ft,{key:t.id,todolist:t,tasks:e,removeTask:c,changeFilter:b,addTask:d,changeTaskStatus:u,removeTodolist:p,changeTaskTitle:m,ChangeTOD:f,demo:a})))})))):i.a.createElement(bt.a,{to:"/login"})},gt=a(182),kt=a(178);function vt(t){return i.a.createElement(kt.a,Object.assign({elevation:6,variant:"filled"},t))}function ht(){var t=Object(k.c)((function(t){return t.app.error})),e=Object(k.b)(),a=function(t,a){"clickaway"!==a&&e(N({error:null}))},n=null!==t;return i.a.createElement(gt.a,{open:n,autoHideDuration:3e3,onClose:a},i.a.createElement(vt,{onClose:a},t))}var Et=a(183),Ct=a(164),jt=a(170),Ot=a(171),Tt=a(86),yt=Object(P.b)({name:"auth",initialState:{isLoggedIn:!1},reducers:{setIsLoggedAC:function(t,e){t.isLoggedIn=e.payload.value}}}),It=(yt.actions.setIsLoggedAC,yt.reducer),At=function(){var t=Object(k.c)((function(t){return t.auth.isLoggedIn})),e=Object(k.b)(),a=Object(Tt.a)({validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",e},initialValues:{email:"",password:"",rememberMe:!1},onSubmit:function(t){var a;e((a=t,function(t){t(z({status:"loading"})),x(a).then((function(e){0===e.data.resultCode?(t(yt.actions.setIsLoggedAC({value:!0})),t(z({status:"succeeded"}))):$(e.data,t)})).catch((function(e){_(e,t)}))}))}});return t?i.a.createElement(bt.a,{to:"/"}):i.a.createElement(at.a,{container:!0,justify:"center"},i.a.createElement(at.a,{item:!0,xs:4},i.a.createElement("form",{onSubmit:a.handleSubmit},i.a.createElement(Et.a,null,i.a.createElement(Ct.a,null,i.a.createElement("p",null,"To log in get registered",i.a.createElement("a",{href:"https://social-network.samuraijs.com/",target:"_blank"},"here")),i.a.createElement("p",null,"or use common test account credentials:"),i.a.createElement("p",null,"Email: free@samuraijs.com"),i.a.createElement("p",null,"Password: free")),i.a.createElement(jt.a,null,i.a.createElement(it.a,Object.assign({label:"Email",margin:"normal"},a.getFieldProps("email"))),a.errors.email?i.a.createElement("div",null,a.errors.email):null,i.a.createElement(it.a,Object.assign({type:"password",label:"Password",margin:"normal"},a.getFieldProps("password"))),a.errors.password?i.a.createElement("div",null,a.errors.password):null,i.a.createElement(Ot.a,{label:"Remember me",control:i.a.createElement(ut.a,a.getFieldProps("RememberMe")),checked:a.values.rememberMe}),i.a.createElement(f.a,{type:"submit",variant:"contained",color:"primary"},"Login"))))))},wt=i.a.memo((function(t){var e=t.demo,a=void 0!==e&&e;console.log("APP with REDUX");var o=Object(k.c)((function(t){return t.app.status})),l=Object(k.c)((function(t){return t.auth.isLoggedIn})),s=(Object(k.c)((function(t){return t.app.isInitialized})),Object(k.b)());Object(n.useEffect)((function(){s((function(t){L().then((function(e){0===e.data.resultCode&&t(yt.actions.setIsLoggedAC({value:!0})),t(R({value:!0}))}))}))}),[]);var r=Object(n.useCallback)((function(){s((function(t){t(z({status:"loading"})),F().then((function(e){0===e.data.resultCode?(t(yt.actions.setIsLoggedAC({value:!1})),t(z({status:"succeeded"}))):$(e.data,t)})).catch((function(e){_(e,t)}))}))}),[]);return i.a.createElement("div",{className:"App"},i.a.createElement(ht,null),i.a.createElement(c.a,{position:"static"},i.a.createElement(d.a,null,i.a.createElement(u.a,{edge:"start",color:"inherit","aria-label":"menu"},i.a.createElement(g.a,null)),i.a.createElement(m.a,{variant:"h6"},"News"),l&&i.a.createElement(f.a,{color:"inherit",onClick:r},"Log out")),"loading"===o&&i.a.createElement(b.a,null)),i.a.createElement(p.a,{fixed:!0},i.a.createElement(bt.b,{exact:!0,path:"/",render:function(){return i.a.createElement(pt,{demo:a})}}),i.a.createElement(bt.b,{path:"/login",render:function(){return i.a.createElement(At,null)}})))})),St=a(22),Lt=a(48),xt=Object(St.c)({tasks:X,todolists:B,app:M,auth:It}),Ft=Object(P.a)({reducer:xt,middleware:function(t){return t().prepend(Lt.a)}});window.store=Ft;var Pt=a(47);l.a.render(i.a.createElement(k.a,{store:Ft},i.a.createElement(Pt.a,null,i.a.createElement(wt,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},99:function(t,e,a){t.exports=a(128)}},[[99,1,2]]]);
//# sourceMappingURL=main.d0295392.chunk.js.map