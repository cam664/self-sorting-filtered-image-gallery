var events={events:{},on:function(e,t){this.events[e]=this.events[e]||[],this.events[e].push(t)},off:function(e,t){if(this.events[e])for(var s=0;s<this.events[e].length;s++)if(this.events[e][s]===t){this.events[e].splice(s,1);break}},emit:function(e,t){this.events[e]&&this.events[e].forEach(function(e){e(t)})}};
//# sourceMappingURL=../maps/pubsub.js.map
