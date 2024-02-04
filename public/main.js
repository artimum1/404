let svgPath = "#matter-path"
let svgWidth = 100
let svgPer = 0.1

let container = document.getElementById("matter-container")


    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        body = Matter.Body,
        Vertices = Matter.Vertices,
        Svg = Matter.Svg,
        vector = Matter.Vector,
        Bodies = Matter.Bodies;



    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: container,
        engine: engine,
        options: {
            width: container.clientWidth,
            height: container.clientHeight,
            wireframes: false,
            background: "#151515",
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);
let invs = Bodies.circle(0,0,40,{isStatic:true,render:{fillStyle:"transparent"},mass:1}) ;
let leftWall =  Bodies.rectangle(-25, container.clientHeight/2 , 50, container.clientHeight, { isStatic: true })
let ground = Bodies.rectangle(container.clientWidth/2, container.clientHeight+25 , container.clientWidth, 50, { isStatic: true })
let rightWall = Bodies.rectangle(container.clientWidth+50, container.clientHeight/2 , 100, container.clientHeight, { isStatic: true })
let roof =  Bodies.rectangle(container.clientWidth/2,-50 , container.clientWidth, 50, { isStatic: true })
let o1 =  Bodies.circle(container.clientWidth/2, container.clientHeight/2, 80, {isStatic:true,restitution: 0.8,friction: 0.2,render:{fillStyle:"#fff"}})
let o2 = Bodies.circle(container.clientWidth/2, container.clientHeight/2, 50, {isStatic:true,isSensor: true,render:{fillStyle:"#151515"}})

    Composite.add(world, [
        rightWall,ground,leftWall,roof,o1,o2,invs
    ]);

    function createSvg(){
        const paths = document.querySelectorAll(svgPath)
        paths.forEach((path,index)=>{
            let vertices = Svg.pathToVertices(path)
            let scaleFactor = (container.clientWidth * svgPer)/svgWidth
            vertices = Vertices.scale(vertices,1.7,1.7)
            if(index === 0){
                let svgBody = Bodies.fromVertices((container.clientWidth/2)-150, container.clientHeight/2, [vertices] ,{isStatic:true,render:{fillStyle:"#fff", strokeStyle: "#fff",lineWidth:1}})
                Composite.add(engine.world, svgBody)
            }
            if(index === 1){
                let svgBody = Bodies.fromVertices((container.clientWidth/2)+180, container.clientHeight/2, [vertices] ,{isStatic:true,render:{fillStyle:"#fff", strokeStyle: "#fff",lineWidth:1}})
                Composite.add(engine.world, svgBody)
            }
        })
    }
    createSvg()
    function createBalls(){
        for (let i = 0; i < 500; i++) {
            Composite.add(engine.world,Bodies.circle((i*4), 0, 7,{restitution:1, friction:0.3,frictionAir:0.001}))
        }
    }
    createBalls()

    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);

window.addEventListener("resize",()=>{
    render.canvas.width = container.clientWidth
    render.canvas.height = container.clientHeight



    Matter.Body.setPosition(
    rightWall,
    Matter.Vector.create(
        container.clientWidth+50,
        container.clientHeight/2
    )
    )

})

document.addEventListener("mousemove",(e)=>{
    Matter.Body.setPosition(
        invs,
        Matter.Vector.create(
            e.clientX,e.clientY
        )
    )
})