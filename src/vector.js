export default class Vector {
  constructor(x, y, z) { 
    if (x == undefined) this.x = 0;
    else this.x = x;
    if (y == undefined) this.y = 0;
    else this.y = y;
    if (z == undefined) this.z = 0;
    else this.z = z;
  }
  
  setComponents(x, y, z) {
    if (x == undefined) this.x = 0;
    else this.x = x;
    if (y == undefined) this.y = 0;
    else this.y = y;
    if (z == undefined) this.z = 0;
    else this.z = z;
  }
  
  add(v2) {
    return new Vector(
        this.x + v2.x,
        this.y + v2.y,
        this.z + v2.z
    );
  }
  
  addTo(v2) {
    this.x += v2.x;
    this.y += v2.y;
    this.z += v2.z;
  }
  
  sub(v2) {
    return new Vector(
        this.x - v2.x,
        this.y - v2.y,
        this.z - v2.z
    );
  }
  
  subFrom(v2) {
    this.x -= v2.x;
    this.y -= v2.y;
    this.z -= v2.z;
  }
  
  multiplyScalar(s) {
    return new Vector(
        this.x * s,
        this.y * s,
        this.z * s
    );
  }
  
  multiplyByScalar(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
  }
  
  divideScalar(s) {
    return new Vector(
        this.x / s,
        this.y / s,
        this.z / s
    );
  }
  
  divideByScalar(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
  }
  
  mag() {
    return Math.sqrt(
        Math.pow(this.x, 2) + 
        Math.pow(this.y, 2) + 
        Math.pow(this.z, 2)
    );
  }
  
  /*
  fromAngles(theta, phi) {
    return new Vector(Math.cos(theta) * Math.cos(phi), Math.sin(phi), Math.sin(theta) * Math.cos(phi));
  }
  */
  
  fromPolar(theta, r) {
    this.setComponents(Math.cos(theta) * r, Math.sin(theta) * r);
  }
  
  copy() {
    return new Vector(
      this.x,
      this.y,
      this.z
    );
  }
}