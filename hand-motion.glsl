/** @resolution */
uniform vec2 u_resolution;

/** @time */
uniform float u_time;

/**
 * @label Illustration
 */
uniform sampler2D u_tex;

/**
 * @label Zoom Amount
 * @range 0.0, 0.4
 * @default 0.14
 */
uniform float u_amount;

/**
 * @label Speed
 * @range 0.1, 3.0
 * @default 1.0
 */
uniform float u_speed;

// "cover" fit: fill the whole node, cropping the longer side, no stretching
vec2 coverUV(vec2 uv, vec2 res, vec2 tex) {
  float ra = res.x / res.y;
  float rt = tex.x / tex.y;
  vec2 sc = (ra > rt) ? vec2(1.0, rt / ra) : vec2(ra / rt, 1.0);
  return (uv - 0.5) * sc + 0.5;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv.y = 1.0 - uv.y; // texture origin is top-left

  vec2 texSize = vec2(textureSize(u_tex, 0));
  uv = coverUV(uv, u_resolution.xy, texSize);

  // breathing zoom: smoothly moves in and out over time
  float phase = 0.5 - 0.5 * cos(u_time * u_speed);   // 0 -> 1 -> 0
  float zoom = 1.0 + u_amount * phase;               // 1.0 .. 1.0+amount

  // zoom centered slightly below middle, where the hand sits
  vec2 center = vec2(0.5, 0.54);
  uv = (uv - center) / zoom + center;

  // tiny vertical drift so it feels like it pushes toward you
  uv.y -= 0.012 * phase;

  gl_FragColor = texture2D(u_tex, clamp(uv, 0.0, 1.0));
}
