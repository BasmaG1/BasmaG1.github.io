export interface ReelVideo {
  type: "local" | "youtube";
  file?: string;
  id?: string;
  src?: string;
  poster: string;
  title: string;
  desc: string;
  tags: string[];
}

export interface VideoProject {
  type: "local" | "youtube";
  id?: string;
  file?: string;
  src?: string;
  poster?: string;
  title: string;
  desc: string;
  tags: string[];
}

export interface GalleryImage {
  src: string;
  title: string;
  cap: string;
}

export interface LightboxItem {
  src: string;
  type?: "image" | "pdf";
  alt?: string;
  title?: string;
  cap?: string;
}

export const REEL_YOUTUBE_ID = "W2V6aheLJys";
export const LATCH_YOUTUBE_ID = "6zToyAnfiK8";
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbgjkboy";

export const CH = [
  "var(--magenta)",
  "var(--raspberry)",
  "var(--emerald)",
  "var(--purple)",
  "var(--olive)",
];

export const reelVideos: ReelVideo[] = [
  {
    type: "local",
    file: "wii.mp4",
    poster: "/images/wii-poster.jpg",
    title: "Wii Island Server",
    desc: "A glitch-art piece staging a custom Wii Sports-style game broadcast through layered CRT and VHS-style distortion.",
    tags: ["Glitch Art", "VHS Effect", "Motion Graphics"],
  },
  {
    type: "local",
    file: "heart.mp4",
    poster: "/images/heart-poster.jpg",
    title: "Holo Heart",
    desc: "A glass-like droplet rendered with refractive, iridescent materials against a soft gradient backdrop.",
    tags: ["Blender", "Refraction", "Abstract"],
  },
  {
    type: "local",
    file: "eyereelvideo.mp4",
    poster: "/images/eyereelvideo-poster.jpg",
    title: "Eye Techno",
    desc: "A surreal VFX composite of a jeweled creature's eye emerging into a real desert cliffside landscape.",
    tags: ["VFX Compositing", "3D", "Surreal"],
  },
  {
    type: "local",
    file: "lighter.mp4",
    poster: "/images/lighter-poster.jpg",
    title: "Globe Lighter",
    desc: "A 3D-modeled lighter wrapped in a repeating globe texture, rendered in Blender.",
    tags: ["Blender", "3D Modeling", "Product Render"],
  },
];

export const videos: VideoProject[] = [
  {
    type: "youtube",
    id: "cfMIfu2KUjE",
    poster: "/images/thumbnails/cfMIfu2KUjE.jpg",
    src: "https://www.youtube-nocookie.com/embed/cfMIfu2KUjE?rel=0&modestbranding=1",
    title: "To Those Willing to See",
    desc: "A 360° community documentary exploring place, perspective, and immersive storytelling through an equirectangular format designed for dome projection. Please watch directly on YouTube to experience the video in 360°.",
    tags: ["360° Media", "Dome Community Documentary", "Equirectangular Render"],
  },
  {
    type: "youtube",
    id: "NJ__vWXrw4g",
    poster: "/images/thumbnails/NJ__vWXrw4g.jpg",
    src: "https://www.youtube-nocookie.com/embed/NJ__vWXrw4g?rel=0&modestbranding=1",
    title: "Miracle — 360° Camera View",
    desc: "A 360° camera view of the Miracle project, presenting the environment from an immersive perspective.",
    tags: ["360° Camera"],
  },
  {
    type: "youtube",
    id: "EzaQpzzWMCI",
    poster: "/images/thumbnails/EzaQpzzWMCI.jpg",
    src: "https://www.youtube-nocookie.com/embed/EzaQpzzWMCI?rel=0&modestbranding=1",
    title: "Miracle — Film Render",
    desc: "A 3D experimental music video created using Blender and Unreal Engine. This rendered view presents the project as a cinematic 3D environment, while the following video explores the same work as an equirectangular dome experience.",
    tags: ["3D Film", "Equirectangular Render", "Blender", "Unreal Engine"],
  },
  {
    type: "youtube",
    id: "coI2gA97i9A",
    poster: "/images/thumbnails/coI2gA97i9A.jpg",
    src: "https://www.youtube-nocookie.com/embed/coI2gA97i9A?rel=0&modestbranding=1",
    title: "ROM Museum — 360° Tour",
    desc: "A 360° walkthrough of the Royal Ontario Museum, using immersive camera movement to explore the museum space and create a guided visual experience. Please watch directly on YouTube to experience the video in 360°.",
    tags: ["Walkthrough", "360° Camera", "Storytelling"],
  },
  {
    type: "youtube",
    id: "_rMro_11S-U",
    poster: "/images/thumbnails/_rMro_11S-U.jpg",
    src: "https://www.youtube-nocookie.com/embed/_rMro_11S-U?rel=0&modestbranding=1",
    title: "Fever Dream",
    desc: "An experimental music video created using photogrammetry and Blender to build and transform a digital environment. The project combines 3D renders, environmental construction, and visual storytelling to create a dreamlike atmosphere.",
    tags: ["Blender Renders", "Photogrammetry", "Environment Building", "Music Video", "Storytelling"],
  },
  {
    type: "youtube",
    id: "QSEIJh9z2ic",
    poster: "/images/thumbnails/QSEIJh9z2ic.jpg",
    src: "https://www.youtube-nocookie.com/embed/QSEIJh9z2ic?rel=0&modestbranding=1",
    title: "Rise of the Droids",
    desc: "A virtual production project combining green-screen techniques and on-set filming to create an immersive cinematic scene.",
    tags: ["Virtual Production", "Green Screen", "On-Set Filming"],
  },
  {
    type: "youtube",
    id: "lUffKXTvTMc",
    poster: "/images/thumbnails/lUffKXTvTMc.jpg",
    src: "https://www.youtube-nocookie.com/embed/lUffKXTvTMc?rel=0&modestbranding=1",
    title: "Imagine",
    desc: "An experimental mixed-media film combining Blender, 360° camera footage, and digital imagery to explore alternative ways of constructing a visual narrative.",
    tags: ["Experimental Film", "Mixed Media", "Blender", "360° Camera"],
  },
  {
    type: "youtube",
    id: "AMZfj46krvI",
    poster: "/images/thumbnails/AMZfj46krvI.jpg",
    src: "https://www.youtube-nocookie.com/embed/AMZfj46krvI?rel=0&modestbranding=1",
    title: "What If Monsters, Inc. Was Horror?",
    desc: "An experimental re-edit that reimagines Monsters, Inc. through a horror-inspired lens. The project uses editing, pacing, and storytelling to transform the tone and meaning of familiar footage.",
    tags: ["Editing", "DaVinci Resolve", "Storytelling"],
  },
  {
    type: "local",
    file: "ttc.mp4",
    poster: "/images/ttc-poster.jpg",
    title: "Silent Ride",
    desc: "A frame-by-frame stop-motion animation created with articulated paper figures, bringing handmade paper characters to life through physical movement and sequential animation.",
    tags: ["Stop-Motion Animation", "Paper Crafts", "Frame-by-Frame"],
  },
  {
    type: "youtube",
    id: LATCH_YOUTUBE_ID,
    poster: "/images/thumbnails/6zToyAnfiK8.jpg",
    src: `https://www.youtube-nocookie.com/embed/${LATCH_YOUTUBE_ID}?rel=0&modestbranding=1`,
    title: "Stay the Night",
    desc: "A VJ and live-visuals piece created and performed in Resolume Arena, exploring real-time visual composition and performance.",
    tags: ["VJ", "Live Visuals", "Resolume Arena"],
  },
  {
    type: "local",
    file: "fish.mp4",
    poster: "/images/fish-poster.jpg",
    title: "Just Keep Swimming",
    desc: "A copper fish pendant animated to swim through the frame using keyframe animation and a parallax camera in After Effects.",
    tags: ["Parallax Effect", "Keyframe Animation", "After Effects"],
  },
  {
    type: "youtube",
    id: "EmfevZNtgSc",
    poster: "/images/thumbnails/EmfevZNtgSc.jpg",
    src: "https://www.youtube-nocookie.com/embed/EmfevZNtgSc?rel=0&modestbranding=1",
    title: "Inflated",
    desc: "Inflated 3D text created in Blender, exploring color changes, dynamic lighting, soft shading, and the visual qualities of digital materials.",
    tags: ["Blender", "3D Modeling"],
  },
];

export const images: GalleryImage[] = [
  {
    src: "/images/gallery-1.jpg",
    title: "Street Photography Collage",
    cap: "Street photography collage composed and edited using Adobe Photoshop.",
  },
  {
    src: "/images/gallery-2.jpg",
    title: "Reflective Abstraction",
    cap: "Experimental study of reflective materials, light dispersion, and abstract colour grading, created in Blender.",
  },
  {
    src: "/images/gallery-3.jpg",
    title: "Digital Collage",
    cap: "Digital collage composition modelled and rendered in Blender.",
  },
  {
    src: "/images/gallery-4.jpg",
    title: "Fireworks & Clown",
    cap: "3D composition featuring fireworks, an animated clown character, and a custom environment created in Unreal Engine.",
  },
  {
    src: "/images/gallery-5.png",
    title: "Hidden Heroes",
    cap: "Mixed-media composition created in Blender, combining 3D assets, a 2D image, and an HDRI environment, rendered using an equirectangular camera.",
  },
  {
    src: "/images/gallery-6-eyes.jpg",
    title: "Mural Animation",
    cap: "Mixed-media composition created in Blender, combining a 360° HDRI environment with frame-by-frame animation inspired by a street mural.",
  },
];

export const resumeItems: LightboxItem[] = [
  {
    src: "/images/CV.pdf",
    type: "pdf",
    alt: "Basma Gado resume / CV",
    title: "CV",
  },
  {
    src: "/images/diploma.jpg",
    type: "image",
    alt: "York University Bachelor of Fine Arts with Honours diploma for Basma Essam Gado",
    title: "Diploma",
  },
];

export const aboutImage: LightboxItem = {
  src: "/images/about.jpg",
  type: "image",
  alt: "Basma Gado — Professional Portrait",
  title: "Basma Gado",
};
