            (function(){
    window.onload = function(){
        function Target(_rad) {
            this.x = 0;
            this.y = 0;
            this.rotate = 0;
            this.radius = _rad;
            this.rotate_speed = Math.random(1)*0.1 + 0.001;
            this.friction = Math.random(1)*0.8 + 0.1;
            this.speed = Math.random(1)*0.2 + 0.03;
            this.step = Math.random(1)*0.5 + 0.0001;
    
            this.freq = Math.random(1)*0.09 + 0.01;
            this.bold_rate = Math.random(1)*0.3 + 0.1;  
        }
    
        function VPoint(x, y){
            this.x = x;
            this.y = y;
            this.vx = 0;
            this.vy = 0;
            this.target = null;
        }
              
        var canvas = document.getElementById('cvs');
        
        if ( ! canvas || ! canvas.getContext ) { //notsupport canvas
            return false;
        }
        
        var w = 100;
        var h = 100;
    
        var _targets;
        var _pts = [];
    
        var _pre_sec = 0;
    
    
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = "rgba(255, 0, 0, 255)";
        ctx.fillRect(0, 0, w, h);
    
        for ( var i=0; i<5333; i++ ) {
            var pt = new VPoint(0,0);
            _pts.push(pt);
        }
    
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, false);
        setInterval(update, 15.6);
    
    
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            w = canvas.width;
            h = canvas.height;
            refreshTarget();
        }
    
        function refreshTarget(){
            _targets = [];
            var sw = w;
            var sh = h;
            var num_w = parseInt(Math.random(1)*8 + 1);
    
            var size = sw / num_w;
            var num_h = parseInt( Math.max(1, sh / size) );
            var i;
    
            var offset_x = (sw - size * (num_w - 1)) / 2;
            var offset_y = (sh - size * (num_h - 1)) / 2;
    
            for ( i = 0; i<num_w; i++ ) {
                for ( var j = 0; j<num_h; j++ ) {
                    var t = new Target(size*0.4);
                    t.x = (size * i) + offset_x;
                    t.y = (size * j) + offset_y;
                    _targets.push(t);
                }
            }
    
            var l = _pts.length;
            for ( i = 0; i<l; i++ ) {
                _pts[i].target = _targets[ i%_targets.length ];
            }
        }
    
        function update(){
            var now_sec = new Date().getTime() / 4000 >> 0;
    
            if ( now_sec - _pre_sec >= 1 ) {
                refreshTarget();
                _pre_sec = now_sec;
            }
    
            var i = 0;
            var l = _targets.length;
            var t;
            var pt;
            for ( i = 0; i<l; i++ ) {
                t = _targets[i];
                t.rotate += t.rotate_speed;
            }
            l = _pts.length;
    
            ctx.fillStyle = "rgba(55, 55, 55, 255)";
            ctx.fillRect(0, 0, w, h);
    
            var sub = 255/h;
    
            for ( i = 0; i<l; i++ ) {
                pt = _pts[i];
                t = pt.target;
                var t_radius = Math.cos(t.rotate*2.321 + t.freq*i) * t.radius * t.bold_rate + t.radius;
                var tx = t.x + Math.cos(t.rotate + t.step*i) * t_radius;
                var ty = t.y + Math.sin(t.rotate + t.step*i) * t_radius;
    
                pt.vx += ( tx - pt.x ) * t.speed;
                pt.vy += ( ty - pt.y ) * t.speed;
    
                pt.x += pt.vx;
                pt.y += pt.vy;
    
                pt.vx *= t.friction;
                pt.vy *= t.friction;
    
                if ( pt.x >= 0 && pt.x <= w && pt.y >= 0 && pt.y <= h ) {
                    ctx.fillStyle = "rgb(200, 200, 200)";
                    ctx.fillRect(pt.x, pt.y, 1.5, 1.5);
                }
            }
    
        }
    };
})();