//vars

var nodeSize = 10;

//functions

var createCuboid = function(x,y,z,w,h,d){
    var nodes = [
        [x,y,z],
        [x,y,z + d],
        [x,y + h,z],
        [x,y + h,z + d],
        [x + w,y,z],
        [x + w,y,z + d],
        [x + w,y + h,z],
        [x + w,y + h,z + d]
        ];
    var edges = [
        [0,1],[0,2],[0,4],
        [1,3],[1,5],
        [2,3],[2,6],
        [3,7],
        [4,5],[4,6],
        [5,7],
        [6,7]
        ];
    var shape = {'nodes': nodes, 'edges': edges};
    
    return shape;
};

var object = createCuboid(-125,-100,-25,250,200,50);
var nodes = object.nodes;
var edges = object.edges;

    //rotate functions

var rotateAroundZ = function(theta){
    var sinTheta = sin(theta);
    var cosTheta = cos(theta);
    
    for (var i = 0; i < nodes.length; i++){
        var node = nodes[i];
        
        var x = node[0];
        var y = node[1];
        
        node[0] = x * cosTheta - y * sinTheta;
        node[1] = y * cosTheta + x * sinTheta;
    }
};

var rotateAroundY = function(theta){
    var sinTheta = sin(theta);
    var cosTheta = cos(theta);
    
    for (var i = 0; i < nodes.length; i++){
        var node = nodes[i];
        
        var x = node[0];
        var z = node[2];
        
        node[0] = x * cosTheta - z * sinTheta;
        node[2] = z * cosTheta + x * sinTheta;
    }
};

var rotateAroundX = function(theta){
    var sinTheta = sin(theta);
    var cosTheta = cos(theta);
    
    for (var i = 0; i < nodes.length; i++){
        var node = nodes[i];
        
        var y = node[1];
        var z = node[2];
        
        node[1] = y * cosTheta - z * sinTheta;
        node[2] = z * cosTheta + y * sinTheta;
    }
};

    //mouse event handler

mouseDragged = function(){
    rotateAroundY(mouseX - pmouseX);
    rotateAroundX(mouseY - pmouseY);
};

//render

var draw = function(){
    
    //setup
    
    resetMatrix();
    translate(200,200);
    
    rotateAroundX(0.1);
    rotateAroundY(0.2);
    rotateAroundZ(0.3);
    
    background(255, 255, 255);
    
    fill(170, 50, 200);
    
    var shapes = [createCuboid(-100,-100,-100,200,200,200)];
    
    //draw edges
    for (var s = 0; s < shapes.length; s++){
        //var nodes = shapes[s].nodes;
        //var edges = shapes[s].edges;
        
        for (var i = 0; i < edges.length; i++){
            var edge = edges[i];
            
            var n0 = edge[0];
            var n1 = edge[1];
            
            var node0 = nodes[n0];
            var node1 = nodes[n1];
            
            line(node0[0],node0[1],node1[0],node1[1]);
        }
    }
    //draw nodes
    
    for (var i = 0; i < nodes.length; i++){
        var n = nodes[i];
        ellipse(n[0],n[1],nodeSize,nodeSize);
    }

};
