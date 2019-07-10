window.addEventListener("DOMContentLoaded", function () {
    app.init();
})
/*
        bug:①镜头未完全设置好，景深问题。
*/
let app = {
    /*模型数据*/
    modelFile: 'obj/miku/White.pmx',// modelFile:'obj/model/MIKU_ by_ KiraKoTova.pmx',
    /*动作数据*/
    vmdFiles: ['obj/Action/5.vmd'],// vmdFiles:[ 'obj/Action.vmd'],
    /*镜头数据*/
    cameraFiles: ['obj/Camera.vmd'],
    /*音频数据*/
    audioFile: '',
    /*判断自动镜头*/
    goon: false,
    init: function () {
        this.MusicListEvent();
        this.Webgl_Check();
        this.MusicListLoad();
    },
    Webgl_Check: function () //检测浏览器兼容
    {
        let app = this;
        Detector.webgl
            ? (function () {
                /*   var outbox=document.createElement("div");
                   outbox.id="outbox";
                   outbox.style.cssText="  text-align: center;overflow: hidden;;position:absolute;width: 500px;height: 300px;left: calc(50% - 250px);top: calc(50% - 150px);border: black 1px solid;"
                   var inbox=document.createElement("div");
                   inbox.id="inbox"
                   inbox.style.cssText="position: absolute;\n" +
                       "\tleft: 0;\n" +
                       "\ttop: 0;\n" +
                       "\tright: -17px;\n" +
                       "\tbottom: 0;\n" +
                       "\toverflow-x: hidden;\n" +
                       "\toverflow-y: scroll;"
                   outbox.appendChild(inbox)
                   document.getElementById("WebGL-output").appendChild(outbox)*/
                app.CreateBaseScene();
            })()
            : (function () {
                var warnings = document.createElement("div");
                warnings.style.cssText =
                    "line-height: 24px;" +
                    "font-size: 16px ;" +
                    "text-height:100px;" +
                    "width:500px;position:" +
                    "relative;left:calc(50% - 250px);" +
                    "text-align:center;" +
                    "background:F9F9F9;" +
                    "margin-top: 200px;";

                warnings.innerHTML = "你的浏览器内核版本过低或者不支持WebGL,请更换Chrome（谷歌）、IE9（或以上）、Edge。若你是双核浏览器（如Uc、360等），请切换核心进行刷新！"
                document.getElementById('WebGL-output').appendChild(warnings);
            })()
    },
    CreateBaseScene: function () //创建基本场景
    {
        let app = this;
        let scene = new THREE.Scene();
        app.scene = scene;
        let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(-10, 68, -135);
        camera.rotation.set(-2.9527, -0.1406, -3.1148);
        app.camera = camera;
        let renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            shadowMapEnabled: true
        });//透明度，抗锯齿，阴影
        renderer.setClearColor(new THREE.Color('#000000'));
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("WebGL-output").appendChild(renderer.domElement);
        let stats = app.initStats()
        window.onresize = function () {
            app.OnResize(camera, renderer)
        }
        let clock = new THREE.Clock();
        ;
        /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        app.AddLight();
        app.AddFlood();
        app.AddAudioRectLight();
        app.AudioAnalysis();
        app.AddEnvironmentalParticlesL()
        app.LoadMMDData();
        document.getElementsByClassName('IsAutoCamera')[0].onchange = function () {
            this.checked
                ? (function () {
                    app.CameraPlay()
                })()
                : (function () {
                    app.CameraRemove()
                })()
        }
        /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        function Render() {
            let arr = new Uint8Array(app.analyser.frequencyBinCount);
            app.analyser.getByteFrequencyData(arr);
            app.AudioRender(arr)
            app.GetStep();
            app.RectLightHelperUpdata();
            stats.update();
            let delta = clock.getDelta();
            if (app.helper) {
                app.helper.update(delta);
            }
            requestAnimationFrame(Render);
            renderer.render(scene, camera);
        }

        Render();
    },
    initStats: function () //性能FPS检测
    {
        let stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.getElementById("Stats-output").appendChild(stats.domElement);
        return stats;
    },
    OnResize: function (camera, renderer)//视图重置
    {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    },
    AddLight: function ()//添加灯光、环境光、平行光
    {
        let app = this;
        var ambient = new THREE.AmbientLight(0x444444);//0x111111//0x666666//0x444444
        app.scene.add(ambient);

        var directionalLight = new THREE.DirectionalLight(0x887766);
        directionalLight.position.set(-1, 1, 1).normalize();
        app.scene.add(directionalLight);
    },
    AddFlood: function ()//添加地板
    {
        let app = this;
        let texture = THREE.ImageUtils.loadTexture("images/001.JPG"); //地板反光贴图
        let planeGeometry = new THREE.PlaneGeometry(500, 500, 20, 20);//地板模型
        let planeMaterial = new THREE.MeshStandardMaterial(           //地板材质
            {
                color: '#2c2c2c',           //颜色//0xaaaaaa
                map: texture,
                reflectivity: 1,
                refractionRatio: 0.98,         //环境贴图折射率   默认0.98
                roughness: 0.3,              //粗糙程度0-1   0镜面 1完全扩散 默认0.5
                //  roughnessMap:texture,      //反光贴图
                metalness: 0,             //材质   1金属  0塑料 默认0.5
                //   metalnessMap:texture,       //反光贴图
                wireframe: false             //测试线框
            });
        let plane = new THREE.Mesh(planeGeometry, planeMaterial);     //地板网格模型
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.y = -0;
        plane.receiveShadow = true;
        app.scene.add(plane);
    },
    AddAudioRectLight: function ()//添加音频可视化 矩形光
    {
        let app = this;

        function CreateRectLight(e) {
            this.width = e.width;
            this.height = e.height;
            this.color = e.color;
            this.intensity = e.intensity;
            this.x = e.x;
            this.y = e.y;
            this.z = e.z;
        }

        CreateRectLight.prototype.create = function () {
            //矩形光
            var rectLight = new THREE.RectAreaLight(this.color, this.intensity, this.width, this.height);
            rectLight.position.set(this.x, this.height / 2, this.z);
            rectLight.lookAt(0, 0, 0)
            app.scene.add(rectLight);
            //矩形光可视图形
            var rectLight_bg = new THREE.CubeGeometry(this.width, this.height, 0)
            var rectLight_bgMat = new THREE.MeshBasicMaterial({color: this.color});
            var rectLight_bg_mesh = new THREE.Mesh(rectLight_bg, rectLight_bgMat);
            rectLight_bg_mesh.position.set(this.x, this.y, this.z);
            rectLight_bg_mesh.lookAt(0, 0, 0)
            // scene.add(rectLight_bg_mesh);
            //矩形光骨架
            let rectLightHelper = new THREE.RectAreaLightHelper(rectLight);
            app.scene.add(rectLightHelper);
            return {light: rectLight, mesh: rectLight_bg_mesh, Helper: rectLightHelper};
        }

        function GetCirclePosition(radius) //计算圆形坐标  参数：半径
        {
            let array = [];
            for (let s = 0; s < 16; s++) {
                let pos = {
                    x: radius * Math.cos(Math.PI / 6 + (2 * Math.PI / 3) * (s / 16)),
                    y: radius * Math.sin(Math.PI / 6 + (2 * Math.PI / 3) * (s / 16))
                }
                array.push(pos)
            }
            return array;
        }

        let position = GetCirclePosition(200)
        let object = [];                     //存储矩形光（RectLight）对象
        position.forEach(function (item) {
            let RectLight = new CreateRectLight({
                width: 10,
                height: 10,
                intensity: 20,
                color: app.getRandomColor(),
                x: item.x - 50,
                y: 10,
                z: item.y - 100
            })
            object.push(RectLight.create())
        })
        app.object = object;
    },
    getRandomColor: function ()//获取随机颜色
    {
        return '#' +
            (function (color) {
                return (color += '0123456789abcdef' [Math.floor(Math.random() * 16)]) && (color.length == 6) ? color : arguments.callee(color);
            })('');
    },
    AudioAnalysis: function ()//音频解析
    {

        /*~~~~~~~~~~~~~~~~~~~~~*/
        let app = this;
        var ctx = new (window.AudioContext || window.webkitAudioContext)();
        var audio = new Audio();
        audio.crossOrigin = "anonymous";

        var audioSrc = ctx.createMediaElementSource(audio);
        var analyser = ctx.createAnalyser();
        analyser.minDecibels = -90;
        analyser.maxDecibels = -10;
        analyser.fftSize = 32;
        app.analyser = analyser;
        audioSrc.connect(analyser);

        var sourceBuffer = ctx.createBufferSource();
        sourceBuffer.connect(analyser);
        sourceBuffer.connect(ctx.destination);


        var audios = new Audio();

        let range = document.getElementsByClassName('range')[0]
        range.oninput = function () {
            SetStep(this.value)
        }
        let range2 = document.getElementsByClassName('range2')[0]
        range2.oninput = function () {
            SetVolume(this.value)
        }
        let start = document.getElementsByClassName('start')[0]
        start.onclick = function () {
            play()
            app.goon == true
                ? (function () {
                    app.MmdStop();
                })()
                : (function () {
                    app.goon = !app.goon
                    app.MMDPlay();
                })()
        }
        let pause_ = document.getElementsByClassName('pause')[0]
        pause_.onclick = function () {
            pause();
            app.MmdStop();
        }
        let load_ = document.getElementsByClassName('load')[0]
        load_.onclick = function () {
            load();
        }
        let play = function () {
            audio.play();
          //  audios.play();
        }
        let pause = function () {
            audio.pause()
            audios.pause()
        }
        let load = function () {
            audio.load()
            audios.load()
        }
        let AudioSrc = function (url) {
            audio.src = url;
            audios.src = url;
            var p1 = new Promise(function (resolve, reject) {
                audio.addEventListener("canplay", function () {
                    resolve(this.duration)
                });
            })
            var p2 = new Promise(function (resolve, reject) {
                audios.addEventListener("canplay", function () {
                    resolve(this.duration)
                });
            })
            Promise.all([p1, p2]).then(function (res) {
                range.max = res[0];
                console.log('音频加载成功')
            }, function () {
                console.log("err");
            })
        }
        app.AudioSrc = AudioSrc;
        let SetVolume = function (Volume) {
            audio.volume = Volume;
            audios.volume = Volume;
        }
        let SetStep = function (time) {
            audio.currentTime = 10
            audios.currentTime = 10
        }
        app.GetStep = function () {
            document.getElementsByClassName('range')[0].value = audio.currentTime
        }
        let SetIsMute = function (boolean) {
            audio.muted = boolean;
            audios.muted = boolean;
        }
    },
    AudioRender: function (arr)//音频三维渲染
    {
        let app = this;
        let size = 16;
        var height = 5;
        for (var s = 0; s < size; s++) {
            var h = arr[s] / 32 * height;
            app.object[s].light.intensity = 5 + h;
            app.object[s].light.height = 1 + h * 2;
            app.object[s].light.position.y = (1 + h * 2) / 2;  //set(this.x,  this.y-(this.height/2), this.z);
        }
    },
    RectLightHelperUpdata: function ()//骨架自动更新
    {
        let app = this;
        let size = 16;
        for (let s = 0; s < size; s++) {
            app.object[s].Helper.update();
        }
    },
    AddEnvironmentalParticlesL: function ()//环境粒子
    {
        let app = this;

        function random_particles(len)// 随机坐标
        {
            var stars = [];
            var range = len;
            for (var x = 0; x < 4000; x++) {
                stars.push
                ({
                    x: Math.random() * range - range / 2,
                    y: Math.random() * range - range / 2,
                    z: Math.random() * range - range / 2
                })
            }
            return stars;
        }

        let cubeGeometry = new THREE.Geometry();//伪容器
        cubeGeometry.vertices = random_particles(100);
        let array = [];
        array.push(cubeGeometry);
        array.push(cubeGeometry);
        let galaxy = new GPUtransform(array, app.scene);
        galaxy.update();
    },
    LoadMMDData: function ()//加载mmd模型、动作数据
    {
        let app = this;
        let loader = new THREE.MMDLoader();

        var p1 = new Promise(function (resolve, reject) {
            loader.loadWithAnimation(app.modelFile, app.vmdFiles, function (mmd)//加载模型、动作数据
            {
                let mesh = mmd.mesh;
                mesh.rotateY(Math.PI)
                mesh.scale.set(2.5, 2.5, 2.5)
                app.scene.add(mesh);
                app.mmd = mmd;
                console.log(mmd)
                resolve('model+action')

            }, app.onProgress, app.onError);
        })
        var p2 = new Promise(function (resolve, reject) {
            loader.loadAnimation(app.cameraFiles, app.camera, function (cameraAnimation)//加载镜头数据
            {
                app.cameraAnimation = cameraAnimation
                resolve('camera')
            }, app.onProgress, app.onError);
        })
        Promise.all([p1, p2]).then(function (res) {
            console.log('模型数据,加载成功')
            app.Helper();
        }, function () {
            console.log("err");
        })
    },
    Helper: function ()//加载模型驱动(动画管理器)
    {
        let app = this;
        let helper = new THREE.MMDAnimationHelper({
            afterglow: 2.0
        });
        app.helper = helper;
    },
    MMDPlay: function () //驱动添加模型、动画、物理、镜头
    {
        let app = this;
        app.helper.add
        (app.mmd.mesh, {
                animation: app.mmd.animation,
                physics: true
            }
        );
        app.helper.add(app.camera,
            {
                animation: app.cameraAnimation
            });

        app.helper.enabled["cameraAnimation"] = false;
        /* app.helper.enabled["animation"]=false;
         app.helper.enabled["physics"]=false;
         app.helper.enabled["grant"]=false;
         app.helper.enabled["ik"]=false;*/

    },
    MmdStop: function ()//动画停止
    {
        let app = this;
        for (let item in app.helper.enabled) {
            if (item == 'cameraAnimation') {
                return
            }
            app.helper.enabled[item] = !app.helper.enabled[item]
        }
    },
    CameraPlay: function ()//开启自动镜头
    {
        let app = this;
        app.mmd.mesh.rotateY(-Math.PI)
        app.mmd.mesh.scale.set(1, 1, 1)
        app.mmd.mesh.position.y = +5;
        app.helper.enabled['cameraAnimation'] = true;
    },
    CameraRemove: function ()//移除自动镜头
    {
        let app = this;
        app.helper.enabled['cameraAnimation'] = false;
        app.mmd.mesh.rotateY(Math.PI)
        app.mmd.mesh.scale.set(2.5, 2.5, 2.5)
        app.mmd.mesh.position.y = 0;

        app.camera.position.set(-10, 68, -135);
        app.camera.rotation.set(-2.9527, -0.1406, -3.1148);
        app.camera.fov = 59.19557853676286;
        app.camera.up.set(0.0003488773738441475, 0.9786070664837542, 0.20573794670882903)
    },
    onProgress: function (xhr) //加载进度
    {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            var warnings = document.createElement("p");
            warnings.innerHTML = Math.round(percentComplete, 2) + '% downloaded'
            console.log(warnings)
        }
    },
    onError: function (xhr) {
    },//加载错误
    MusicListLoad: function ()//音乐列表加载数据（模拟）+列表子元素li事件
    {
        let app = this;
        let TestMusic = [
            {name: '水之证', src: 'media/水之证.mp3'},
            {name: '放毒', src: 'media/666.mp3'}
        ]
        TestMusic.forEach(function (item) {
            $('<li/>').text(item.name).attr('src', item.src).appendTo('.MusicList>ul').addClass('.MusicList>ul>li').click(function () {
                if ($(this).attr('choose')) {
                    console.log('返回')
                    return;
                } else {
                    $(this).attr('choose', 'IsMe')
                    $(this).siblings().attr('choose', '')
                    $(this).css({backgroundColor: '#b3a285'})
                    $(this).siblings().css({backgroundColor: 'black'})
                    app.audioFile = $(this).attr('src')
                    app.AudioSrc(app.audioFile)
                    try {
                        app.helper.remove
                        (app.mmd.mesh, {
                                animation: app.mmd.animation,
                                physics: true
                            }
                        );
                        app.helper.remove(app.camera,
                            {
                                animation: app.cameraAnimation
                            });
                        app.scene.remove(app.mmd.mesh);
                        app.LoadMMDData();
                        app.goon = false

                    } catch (e) {
                    }

                }


            })
        })
    },
    MusicListEvent: function () //音乐列表事件
    {
        let swithc = false;
        $('.MusicList>p').click(function () {
            let app = this;
            swithc = !swithc
            swithc
                ? (function () {
                    $('.MusicList').animate({width: '12px', border: '0'}, 1000, function () {
                        $(this).css({boxShadow: '0 0 0 black inset'})
                        $(app).text('→')
                    })
                })()
                : (function () {
                    $('.MusicList').animate({width: '200px', border: '1px solid black'}, 1000, function () {
                        $(this).css({boxShadow: '0 0 10px white inset'})
                        $(app).text('←')
                    })
                })()


        });
    }

}

