(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{103:function(t,e,a){"use strict";a.r(e);var n=a(0),c=a.n(n),i=a(9),r=a.n(i);a(80),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(51);var o,l,s=a(137),u=a(138),d=a(133),f=a(140),m=a(136),O=a(141),b=a(139),k=a(24),T=a(18),E=a(8),v=a(16),j=a(19),h=a(143),p=a(134),g=c.a.memo((function(t){console.log("add item form");var e=Object(n.useState)(""),a=Object(j.a)(e,2),i=a[0],r=a[1],o=Object(n.useState)(null),l=Object(j.a)(o,2),s=l[0],u=l[1],f=function(){""!==i.trim()?(t.addItem(i),r("")):u("Title is required")},m=Object(n.useCallback)((function(t){r(t.currentTarget.value)}),[]),O=Object(n.useCallback)((function(t){null!==s&&u(null),13===t.charCode&&f()}),[]);return c.a.createElement("div",null,c.a.createElement(h.a,{variant:"outlined",value:i,onChange:m,onKeyPress:O,error:!!s,label:"Title",helperText:s}),c.a.createElement(d.a,{color:"primary",onClick:f},c.a.createElement(p.a,null),"!"))})),C=c.a.memo((function(t){console.log("Ediable span");var e=Object(n.useState)(!1),a=Object(j.a)(e,2),i=a[0],r=a[1],o=Object(n.useState)(t.title),l=Object(j.a)(o,2),s=l[0],u=l[1];return i?c.a.createElement(h.a,{variant:"outlined",value:s,onChange:function(t){u(t.currentTarget.value)},autoFocus:!0,onBlur:function(){r(!1),t.saveTitle(s),u("")}}):c.a.createElement("span",{onDoubleClick:function(){r(!0)}},t.title)})),I=a(135),S=a(144),D=a(64),L=a.n(D).a.create({withCredentials:!0,baseURL:"https://social-network.samuraijs.com/api/1.1/",headers:{"API-KEY":"53444f05-2fd9-4762-9034-1b37fffb3067"}}),y=function(){return L.get("todo-lists/")},A=function(t){return L.post("todo-lists/",{title:t})},w=function(t){return L.delete("todo-lists/".concat(t))},F=function(t,e){return L.put("todo-lists/".concat(t),{title:e})},N=function(t){return L.get("todo-lists/".concat(t,"/tasks"))},K=function(t,e){return L.post("todo-lists/".concat(t,"/tasks"),{title:e})},R=function(t,e){return L.delete("todo-lists/".concat(t,"/tasks/").concat(e))},x=function(t,e,a){return L.put("todo-lists/".concat(t,"/tasks/").concat(e),a)};!function(t){t[t.New=0]="New",t[t.inProgress=1]="inProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(o||(o={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(l||(l={}));var P=c.a.memo((function(t){var e=Object(n.useCallback)((function(e){t.changeTaskTitle(t.tasks.id,e,t.taskId)}),[t.changeTaskTitle,t.tasks.id,t.taskId]);return c.a.createElement("div",{key:t.tasks.id,className:t.tasks.status===o.Completed?"is-done":""},c.a.createElement(S.a,{color:"primary",onChange:function(e){var a=e.currentTarget.checked;t.changeTaskStatus(t.tasks.id,a?o.Completed:o.New,t.taskId)},checked:t.tasks.status===o.Completed}),c.a.createElement(C,{title:t.tasks.title,saveTitle:e}),c.a.createElement(d.a,{onClick:function(){return t.removeTask(t.tasks.id,t.taskId)}},c.a.createElement(I.a,null)))})),M={},H=function(t,e){return{type:"ADD-TASK",todolistId:t,task:e}},U=function(t,e,a){return function(n,c){var i=c().tasks[a].find((function(t){return t.id}));if(i){var r=Object(E.a)({deadline:i.deadline,description:i.description,priority:i.priority,startDate:i.startDate,title:i.title,status:i.status},e);x(a,t,r).then((function(c){var i=function(t,e,a){return{type:"UPDATE-TASK",model:e,todolistId:a,taskId:t}}(t,e,a);n(i)}))}else console.warn("\u0442\u0430\u0441\u043a\u0430 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u0430")}},V=c.a.memo((function(t){console.log("todolist");var e=Object(k.b)();Object(n.useEffect)((function(){var a;e((a=t.id,function(t){N(a).then((function(e){t(function(t,e){return{type:"SET-TASK",tasks:t,todoListId:e}}(e.data.items,a))}))}))}),[]);var a=Object(n.useCallback)((function(e){t.addTask(e,t.id)}),[t.addTask,t.id]),i=Object(n.useCallback)((function(){return t.changeFilter("all",t.id)}),[t.changeFilter,t.id]),r=Object(n.useCallback)((function(){return t.changeFilter("active",t.id)}),[t.changeFilter,t.id]),l=Object(n.useCallback)((function(){return t.changeFilter("completed",t.id)}),[t.changeFilter,t.id]),s=Object(n.useCallback)((function(){return t.removeTodolist(t.id)}),[t.removeTodolist,t.id]),u=Object(n.useCallback)((function(e){t.ChangeTOD(e,t.id)}),[t.id]),f=t.tasks;return"active"===t.filter&&(f=t.tasks.filter((function(t){return t.status===o.New}))),"completed"===t.filter&&(f=t.tasks.filter((function(t){return t.status===o.Completed}))),c.a.createElement("div",null,c.a.createElement("h3",null,c.a.createElement(C,{title:t.title,saveTitle:u}),c.a.createElement(d.a,{onClick:s},c.a.createElement(I.a,null))),c.a.createElement(g,{addItem:a}),c.a.createElement("div",null,f.map((function(e){return c.a.createElement(P,{changeTaskTitle:t.changeTaskTitle,changeTaskStatus:t.changeTaskStatus,removeTask:t.removeTask,tasks:e,taskId:t.id,key:e.id})}))),c.a.createElement("div",null,c.a.createElement(m.a,{variant:"all"===t.filter?"contained":"text",onClick:i,color:"inherit"},"All"),c.a.createElement(m.a,{variant:"active"===t.filter?"contained":"text",onClick:r,color:"primary"},"Active"),c.a.createElement(m.a,{variant:"completed"===t.filter?"contained":"text",onClick:l,color:"secondary"},"Completed")))})),G=a(145),B=a(142),J=a(104);Object(G.a)(),Object(G.a)();var W=[],q=function(t){var e=Object(k.b)(),a=Object(k.c)((function(t){return t.todolists})),i=Object(k.c)((function(t){return t.tasks}));Object(n.useEffect)((function(){e((function(t){y().then((function(e){t({type:"SET-TODOLIST",todoList:e.data})}))}))}),[]);var r=Object(n.useCallback)((function(t,a){var n,c;e((n=t,c=a,function(t){R(c,n).then((function(e){t(function(t,e){return{type:"REMOVE-TASK",taskId:t,todolistId:e}}(n,c))}))}))}),[e]),o=Object(n.useCallback)((function(t,a){e(function(t,e){return function(a){K(e,t).then((function(t){var n=t.data.data.item,c=H(e,n);a(c)}))}}(t,a))}),[e]),l=Object(n.useCallback)((function(t,a,n){var c=U(t,{status:a},n);e(c)}),[e]),s=Object(n.useCallback)((function(t,a,n){var c=U(t,{title:a},n);e(c)}),[e]),u=Object(n.useCallback)((function(t,a){var n,c,i=(n=a,c=t,function(t){F(n,c).then((function(e){t(function(t,e){return{type:"CHANGE-TODOLIST-TITLE",id:t,title:e}}(n,c))}))});e(i)}),[e]),d=Object(n.useCallback)((function(t,a){e(function(t,e){return{type:"CHANGE-TODOLIST-FILTER",id:e,filter:t}}(t,a))}),[e]),f=Object(n.useCallback)((function(t){var a;e((a=t,function(t){w(a).then((function(e){t({type:"REMOVE-TODOLIST",id:a})}))}))}),[e]),m=Object(n.useCallback)((function(t){e(function(t){return function(e){A(t).then((function(t){var a=t.data.data.item;e(function(t){return{type:"ADD-TODOLIST",todolist:t}}(a))}))}}(t))}),[e]);return c.a.createElement(c.a.Fragment,null," ",c.a.createElement(B.a,{container:!0,style:{padding:"10px"}},c.a.createElement(g,{addItem:m})),c.a.createElement(B.a,{container:!0,spacing:3},a.map((function(t){var e=i[t.id];return c.a.createElement(B.a,{item:!0},c.a.createElement(J.a,{style:{padding:"10px"}},c.a.createElement(V,{key:t.id,id:t.id,title:t.title,tasks:e,removeTask:r,changeFilter:d,addTask:o,changeTaskStatus:l,filter:t.filter,removeTodolist:f,changeTaskTitle:s,ChangeTOD:u})))}))))},X=c.a.memo((function(){return console.log("APP with REDUX"),c.a.createElement("div",{className:"App"},c.a.createElement(s.a,{position:"static"},c.a.createElement(u.a,null,c.a.createElement(d.a,{edge:"start",color:"inherit","aria-label":"menu"},c.a.createElement(b.a,null)),c.a.createElement(f.a,{variant:"h6"},"News"),c.a.createElement(m.a,{color:"inherit"},"Login"))),c.a.createElement(O.a,{fixed:!0},c.a.createElement(q,null)))})),Y=a(31),$=a(65),z=Object(Y.c)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,e=arguments.length>1?arguments[1]:void 0,a=Object(E.a)({},t);switch(e.type){case"REMOVE-TASK":return a[e.todolistId]=a[e.todolistId].filter((function(t){return t.id!==e.taskId})),a;case"ADD-TASK":return Object(E.a)(Object(E.a)({},t),{},Object(v.a)({},e.task.todoListId,[e.task].concat(Object(T.a)(t[e.task.todoListId]))));case"UPDATE-TASK":return Object(E.a)(Object(E.a)({},t),{},Object(v.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(E.a)(Object(E.a)({},t),e.model):t}))));case"ADD-TODOLIST":return Object(E.a)(Object(E.a)({},t),{},Object(v.a)({},e.todolist.id,[]));case"REMOVE-TODOLIST":return delete a[e.id],a;case"SET-TODOLIST":var n=Object(E.a)({},t);return e.todoList.forEach((function(t){n[t.id]=[]})),n;case"SET-TASK":var c=Object(E.a)({},t);return c[e.todoListId]=e.tasks,c;default:return t}},todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!=e.id}));case"ADD-TODOLIST":var a=Object(E.a)(Object(E.a)({},e.todolist),{},{filter:"all"});return[a].concat(Object(T.a)(t));case"CHANGE-TODOLIST-TITLE":var n=t.find((function(t){return t.id===e.id}));return n&&(n.title=e.title),Object(T.a)(t);case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.id?Object(E.a)(Object(E.a)({},t),{},{filter:e.filter}):t}));case"SET-TODOLIST":return e.todoList.map((function(t){return Object(E.a)(Object(E.a)({},t),{},{filter:"all"})}));default:return t}}}),Q=Object(Y.d)(z,Object(Y.a)($.a));window.store=Q,r.a.render(c.a.createElement(k.a,{store:Q},c.a.createElement(X,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},51:function(t,e,a){},75:function(t,e,a){t.exports=a(103)},80:function(t,e,a){}},[[75,1,2]]]);
//# sourceMappingURL=main.8eb22c49.chunk.js.map