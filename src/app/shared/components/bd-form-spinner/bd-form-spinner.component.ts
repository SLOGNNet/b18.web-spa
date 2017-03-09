import { Component, EventEmitter, ElementRef } from '@angular/core';
declare let THREE: any;

@Component({
  selector: 'bd-form-spinner',
  styleUrls: ['bd-form-spinner.component.scss'],
  templateUrl: './bd-form-spinner.component.html'
})
export class BdFormSpinnerComponent {

  constructor(private el: ElementRef) {

  }

  ngOnInit() {
    setTimeout(() => {
      let $wrap = this.el.nativeElement.getElementsByClassName('bd-form-spinner')[0],

        areawidth = window.innerWidth,
        areaheight = window.innerHeight,

        canvassize = 200,

        length = 30,
        radius = 5.6,

        rotatevalue = 0.035,
        acceleration = 0,
        animatestep = 0,

        pi2 = Math.PI * 2,

        group = new THREE.Group(),
        mesh, ringcover, ring,

        camera, scene, renderer;


      camera = new THREE.PerspectiveCamera(25, 1, 1, 10000);
      camera.position.z = 150;

      scene = new THREE.Scene();
      scene.add(group);

      mesh = new THREE.Mesh(
        new THREE.TubeGeometry(new (THREE.Curve.create(function () { },
          function (percent) {

            let x = length * Math.sin(pi2 * percent),
              y = radius * Math.cos(pi2 * 3 * percent),
              z, t;

            t = percent % 0.25 / 0.25;
            t = percent % 0.25 - (2 * (1 - t) * t * -0.0185 + t * t * 0.25);
            if (Math.floor(percent / 0.25) === 0 || Math.floor(percent / 0.25) === 2) {
              t *= -1;
            }
            z = radius * Math.sin(pi2 * 2 * (percent - t));

            return new THREE.Vector3(x, y, z);

          }
        ))(), 200, 1.1, 2, true),
        new THREE.MeshBasicMaterial({
          color: 0x75b3e2
        })
      );
      group.add(mesh);

      ringcover = new THREE.Mesh(new THREE.PlaneGeometry(50, 15, 1), new THREE.MeshBasicMaterial({ opacity: 0, transparent: true }));
      ringcover.position.x = length + 1;
      ringcover.rotation.y = Math.PI / 2;
      group.add(ringcover);

      ring = new THREE.Mesh(new THREE.RingGeometry(4.3, 5.55, 32), new THREE.MeshBasicMaterial({ opacity: 0, transparent: true }));
      ring.position.x = length + 1.1;
      ring.rotation.y = Math.PI / 2;
      group.add(ring);

      // fake shadow
      (function () {
        let plain, i;
        for (i = 0; i < 10; i++) {
          plain = new THREE.Mesh(
            new THREE.PlaneGeometry(length * 2 + 1, radius * 3, 1),
            new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
          );
          plain.position.z = -2.5 + i * 0.5;
          group.add(plain);
        }
      })();

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(canvassize, canvassize);
      renderer.setClearColor('#ffffff', 0);

      $wrap.appendChild(renderer.domElement);

      animate();

      function tilt(percent) {
        group.rotation.y = percent * 0.5;
      }

      function render() {

        let progress;

        animatestep = Math.max(0, Math.min(240, animatestep - 4));
        acceleration = easing(animatestep, 0, 1, 240);

        if (acceleration > 0.35) {
          progress = (acceleration - 0.35) / 0.65;
          group.rotation.y = -Math.PI / 2 * progress;
          group.position.z = 50 * progress;
          progress = Math.max(0, (acceleration - 0.97) / 0.03);
          mesh.material.opacity = 1 - progress;
          ringcover.material.opacity = ring.material.opacity = progress;
          ring.scale.x = ring.scale.y = 0.9 + 0.1 * progress;
        }

        renderer.render(scene, camera);

      }

      function animate() {
        mesh.rotation.x += rotatevalue + acceleration;
        render();
        requestAnimationFrame(animate);
      }

      function easing(t, b, c, d) {
        t /= d / 2;

        if (t < 1) return c / 2 * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
      }
    }, 0);
  }

}
