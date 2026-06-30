import { useEffect, useRef } from 'react';

export default function LiquidObsidianShader({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = canvas.clientWidth || 800;
    let height = canvas.clientHeight || 600;
    canvas.width = width;
    canvas.height = height;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution.xy;
          
          // Create a subtle flowing "Liquid Obsidian" effect
          vec2 p = uv * 2.0 - 1.0;
          p.x *= u_resolution.x / u_resolution.y;
          
          float t = u_time * 0.15;
          for(float i = 1.0; i < 4.0; i++) {
              p.x += 0.3 / i * sin(i * 3.0 * p.y + t + i * 1.5);
              p.y += 0.3 / i * cos(i * 3.0 * p.x + t + i * 2.0);
          }
          
          // Warm luxurious fluid linen/silk background with soft shadows
          vec3 baseColor = vec3(0.96, 0.95, 0.93); 
          vec3 highlight = vec3(0.86, 0.85, 0.82); // Muted warm linen/stone shadow
          
          float strength = abs(sin(p.x + p.y));
          vec3 finalColor = mix(baseColor, highlight, strength * 0.5);
          
          gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    function compileShader(type: number, src: string) {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, src);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error(gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vs);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fs);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    let mouse = { x: width / 2, y: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = 1.0 - (e.clientY - rect.top) / rect.height;
        mouse.x = nx * width;
        mouse.y = ny * height;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const resizeObserver = new ResizeObserver(() => {
      if (!canvas) return;
      width = canvas.clientWidth || 800;
      height = canvas.clientHeight || 600;
      canvas.width = width;
      canvas.height = height;
    });
    resizeObserver.observe(canvas);

    const render = (time: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, time * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  );
}
