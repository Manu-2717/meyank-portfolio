export const profile = {
  name: 'Meyank',
  role: 'AI & Data Science Student',
  email: 'meyank27@gmail.com',
  summary: 'I build language tools and practical AI systems, from multilingual datasets to efficient model inference.',
  about: 'I am a second-year B.Tech student in Artificial Intelligence and Data Science at USAR. My work explores large language models, natural-language processing, and database systems. I enjoy taking an idea from a research question to a useful tool people can actually try.',
  links: {
    github: 'https://github.com/Manu-2717',
    linkedin: 'https://www.linkedin.com/in/meyank-354a79372/',
    huggingFace: 'https://huggingface.co/Meyank',
  },
  skills: [
    { group: 'Languages', items: ['Python', 'C', 'C++', 'Java', 'SQL'] },
    { group: 'Machine learning', items: ['PyTorch', 'NumPy', 'Pandas', 'Scikit-learn', 'Matplotlib'] },
    { group: 'Language systems', items: ['Hugging Face', 'Model fine-tuning', 'Text-to-SQL', 'Multilingual data'] },
    { group: 'Development', items: ['Relational databases', 'Git', 'GitHub', 'Jupyter Notebook'] },
  ],
  projects: [
    {
      index: '01', title: 'Turbo-LLM', label: 'Inference engineering', status: 'Collaborative · ongoing',
      description: 'Contributing to a memory-efficient inference engine for large Mixture-of-Experts models on limited-VRAM consumer hardware.',
      tags: ['LLM inference', 'Mixture-of-Experts', 'Memory efficiency'],
      walkthrough: [
        { title: 'The challenge', detail: 'Large Mixture-of-Experts models are difficult to run on consumer hardware with limited VRAM.' },
        { title: 'The work', detail: 'This collaborative project is building a memory-efficient inference engine.' },
        { title: 'The aim', detail: 'Make inference for large MoE models more practical on limited-VRAM consumer hardware. The project is ongoing.' },
      ],
      url: 'https://github.com/Manu-2717/Turbo-LLM', linkLabel: 'View repository', tone: 'blue',
    },
    {
      index: '02', title: 'Tiny Stories Hindi', label: 'Multilingual dataset', status: 'Published dataset',
      description: 'Created and published a large-scale Hindi story dataset by processing and adapting Chinese-origin stories for Hindi-language model training.',
      tags: ['Hindi', 'Dataset development', 'Hugging Face'],
      walkthrough: [
        { title: 'Source material', detail: 'The work started with Chinese-origin stories.' },
        { title: 'Hindi adaptation', detail: 'The stories were processed and adapted for Hindi-language model training.' },
        { title: 'Published dataset', detail: 'The resulting large-scale Hindi story dataset is available on Hugging Face.' },
      ],
      url: 'https://huggingface.co/datasets/Meyank/Tiny_Stories_Hindi', linkLabel: 'Explore dataset', tone: 'violet',
    },
    {
      index: '03', title: 'Text-to-SQL', label: 'Model fine-tuning', status: 'Research project',
      description: 'Fine-tuned a language model to translate natural-language questions into structured SQL queries, applying LLM training and database concepts.',
      tags: ['LLM fine-tuning', 'SQL', 'NLP'],
      walkthrough: [
        { title: 'Natural language', detail: 'A user starts with a question written in everyday language.' },
        { title: 'Model fine-tuning', detail: 'A language model was fine-tuned for the text-to-SQL task.' },
        { title: 'Structured query', detail: 'The intended output is a structured SQL query based on the question.' },
      ],
      url: null, linkLabel: '', tone: 'mint',
    },
    {
      index: '04', title: 'CampusPilot', label: 'AI browser workflows', status: 'Built project',
      description: 'Built an AI-assisted browser workflow system that learns and reuses college-portal tasks, with a Python/FastAPI backend, SQLite workflow memory, and a React/TypeScript interface.',
      tags: ['FastAPI', 'SQLite', 'React', 'TypeScript'],
      walkthrough: [
        { title: 'Portal task', detail: 'A college-portal task is the starting point for the browser workflow.' },
        { title: 'Workflow memory', detail: 'The AI-assisted system learns and reuses tasks, with SQLite storing workflow memory.' },
        { title: 'The interface', detail: 'A React and TypeScript interface works with a Python and FastAPI backend.' },
      ],
      url: 'https://github.com/Manu-2717/CampusPilot', linkLabel: 'View repository', tone: 'amber',
    },
  ],
  timeline: [
    { date: '2025 — 2029', title: 'B.Tech in Artificial Intelligence & Data Science', place: 'University School of Automation and Robotics (USAR)', description: 'Studying AI and data science, with a focus on language models, NLP, and database systems.' },
    { date: '2025 — Present', title: 'Core Member', place: 'UFC · USAR FOSS Club', description: 'Contributing to a student community focused on open-source development, collaborative learning, and technical projects.' },
  ],
} as const
