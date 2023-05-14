const sketch = (p5) => {
    p5.distance = 70;
    p5.screenSize = 400;
    p5.numberOfNodes = 50;
    p5.maxSpeed = 2;
    p5.nodes = [];
    // The sketch setup method 
    p5.setup = () => {
        // Creating and positioning the canvas
        const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        // Configuring the canvas
        p5.background("black");
        for (let i = 0; i < p5.numberOfNodes; i++) {
            p5.nodes.push(new Node(p5.random(p5.windowWidth), p5.random(p5.windowHeight), p5.random(p5.maxSpeed), p5.random(-1, 1), p5.random(-1, 1)));
        }
    };
    // The sketch draw method
    p5.draw = () => {
        p5.background("black");
        for (let i = 0; i < p5.numberOfNodes; i++) {
            p5.nodes[i].move(p5);
            p5.nodes[i].display(p5);
        }
    };
};
var p5sketch = new p5(sketch);
class Node {
    constructor(xpos_, ypos_, speed_, rise_, run_) {
        this.xpos = xpos_;
        this.ypos = ypos_;
        this.speed = speed_;
        this.run = run_;
        this.rise = rise_;
    }
    display(p5) {
        p5.noStroke();
        p5.fill(0, 0, 0, 30);
        p5.circle(this.xpos, this.ypos, 1);
        for (let i = 0; i < p5.nodes.length; i++) {
            if (p5.nodes[i] === this)
                continue;
            let strokeWeight = p5.sqrt(Math.pow(p5.abs(this.xpos - p5.nodes[i].xpos), 2) + Math.pow(p5.abs(this.ypos - p5.nodes[i].ypos), 2));
            p5.stroke(255, 40 + p5.distance - strokeWeight);
            p5.line(this.xpos, this.ypos, p5.nodes[i].xpos, p5.nodes[i].ypos);
        }
    }
    move(p5) {
        this.xpos = this.xpos + (this.speed * this.run);
        this.ypos = this.ypos + (this.speed * this.rise);
        if (this.xpos > p5.windowWidth) {
            this.xpos = 0;
        }
        else if (this.xpos < 0) {
            this.xpos = p5.windowWidth;
        }
        if (this.ypos > p5.windowHeight) {
            this.ypos = 0;
        }
        else if (this.ypos < 0) {
            this.ypos = p5.windowHeight;
        }
    }
}
