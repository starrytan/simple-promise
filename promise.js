   function promise(cb) {
       function reslove(value) {
           if (this.thencb) {
               let result = this.thencb.cb(value);
               if (result instanceof promise) {
                   result.then(this.thencb.rs);
               } else {
                   this.thencb.rs();
               }
           }
       }
       cb(reslove.bind(this));
   }
   promise.prototype.then = function (thencb) {
       return new promise((reslove) => {
           this.thencb = {
               cb: thencb,
               rs: reslove
           };
       })
   }
   new promise(resolve => {
           setTimeout(() => {
               resolve(1);
           }, 500)
       })
       .then(res => {
           console.log('res: ', res);
           return new promise(resolve => {
               setTimeout(() => {
                   resolve(2);
               }, 500);
           })
       })
       .then((res2) => {
           console.log('res2: ', res2);
       });
