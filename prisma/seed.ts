import { ContactKind, Prisma, PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

type SeedSkill = {
  name: string;
  category: string;
};

const skills: SeedSkill[] = [
  { name: 'TypeScript', category: 'Backend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'NestJS', category: 'Backend' },
  { name: 'Express', category: 'Backend' },
  { name: 'Fastify', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'Go', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Данные' },
  { name: 'ClickHouse', category: 'Данные' },
  { name: 'SQLite', category: 'Данные' },
  { name: 'Prisma', category: 'Данные' },
  { name: 'моделирование данных', category: 'Данные' },
  { name: 'REST', category: 'API и интеграции' },
  { name: 'GraphQL', category: 'API и интеграции' },
  { name: 'Webhooks', category: 'API и интеграции' },
  { name: 'gRPC', category: 'API и интеграции' },
  { name: 'OAuth2', category: 'API и интеграции' },
  { name: 'JWT', category: 'API и интеграции' },
  { name: 'CRM', category: 'API и интеграции' },
  { name: 'n8n', category: 'API и интеграции' },
  { name: 'Docker', category: 'Инфраструктура' },
  { name: 'Git', category: 'Инфраструктура' },
  { name: 'CI/CD', category: 'Инфраструктура' },
  { name: 'Linux', category: 'Инфраструктура' },
  { name: 'деплой на VPS', category: 'Инфраструктура' },
  { name: 'LangGraph', category: 'AI и LLM' },
  { name: 'RAG', category: 'AI и LLM' },
  { name: 'Evals', category: 'AI и LLM' },
  { name: 'векторные базы данных', category: 'AI и LLM' },
  { name: 'Tool Calling', category: 'AI и LLM' },
  { name: 'HTML', category: 'Фронтенд' },
  { name: 'CSS', category: 'Фронтенд' },
  { name: 'JavaScript', category: 'Фронтенд' },
  { name: 'React', category: 'Фронтенд' },
  { name: 'Next.js', category: 'Фронтенд' },
  { name: 'EJS', category: 'Фронтенд' },
  { name: 'Bootstrap', category: 'Фронтенд' },
  { name: 'воронки', category: 'Продукт и аналитика' },
  { name: 'A/B тестирование', category: 'Продукт и аналитика' },
  { name: 'Яндекс Метрика', category: 'Продукт и аналитика' },
  { name: 'продуктовая аналитика', category: 'Продукт и аналитика' },
];

const contacts: { kind: ContactKind; label: string; value: string }[] = [
  { kind: ContactKind.GITHUB, label: 'GitHub', value: 'https://github.com/Feamlaz' },
  { kind: ContactKind.TELEGRAM, label: 'Telegram', value: 'https://t.me/nomer_bmw_top' },
  { kind: ContactKind.EMAIL, label: 'Email', value: 'alexand-g@bk.ru' },
  { kind: ContactKind.PHONE, label: 'Телефон', value: '+7 (925) 047-27-75' },
];

const experiences: {
  slug: string;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | null;
  sortOrder: number;
  achievements: string[];
  skills: string[];
}[] = [
  {
    slug: 'grand-fullstack',
    company: 'Гранд',
    position: 'Fullstack-разработчик',
    startDate: new Date('2022-07-01'),
    endDate: new Date('2025-08-01'),
    sortOrder: 1,
    achievements: [
      'Спроектировал и внедрил RAG-систему контекстного поиска для маркетинговой аналитики: семантический чанкинг, гибридный поиск BM25 + embeddings по прайсам, логам поддержки и выгрузкам из рекламных кабинетов Meta и TikTok. Citation tracing убрал галлюцинации из отчётов для руководства.',
      'Собрал пайплайн обновления базы знаний на n8n — переиндексация каждые два часа. Владельцы бизнеса получили единую картину атрибуции без ручных SQL-запросов.',
      'Выстроил eval-first систему контроля качества LLM-ответов на Langfuse: метрики стоимости, латентности и качества по каждому запросу, автоматическое переключение на резервного провайдера при деградации.',
    ],
    skills: [
      'TypeScript',
      'Node.js',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'ClickHouse',
      'REST',
      'CRM',
      'n8n',
      'LangGraph',
      'RAG',
      'Evals',
      'векторные базы данных',
      'Tool Calling',
      'Docker',
      'Git',
      'CI/CD',
      'продуктовая аналитика',
    ],
  },
  {
    slug: 'ip-frontend',
    company: 'ИП',
    position: 'Frontend-разработчик',
    startDate: new Date('2023-02-01'),
    endDate: new Date('2026-05-01'),
    sortOrder: 2,
    achievements: [
      'Спроектировал мультиагентную структуру для отдела продаж и аналитики: агенты-планировщик, исследователь и исполнитель с долговременной памятью на PgVector и Tool Calling. Агенты начали обновлять статусы заказов, формировать отчёты и инициировать рассылки — операционные затраты снизились на 40%.',
      'Автоматизировал генерацию рекламных креативов через ComfyUI и LLM с A/B тестированием на внешних площадках. Адаптация под тренды в реальном времени сократила стоимость лида на 20%. Реализовал fallback-цепочки OpenAI → Claude.',
      'Перенёс интерфейсы на TypeScript, настроил сборку, покрыл компоненты юнит-тестами и Storybook. Снизил время загрузки за счёт code splitting и lazy loading.',
    ],
    skills: [
      'TypeScript',
      'JavaScript',
      'React',
      'Next.js',
      'HTML',
      'CSS',
      'Bootstrap',
      'EJS',
      'CRM',
      'Tool Calling',
      'векторные базы данных',
      'Evals',
      'воронки',
      'A/B тестирование',
      'продуктовая аналитика',
    ],
  },
];

const projects: {
  name: string;
  description: string;
  repositoryUrl: string;
  liveUrl: string | null;
  period: string;
  tech: string[];
  featured: boolean;
  sortOrder: number;
  skills: string[];
}[] = [
  {
    name: 'CRM-Site',
    description:
      'CRM для управления лендингами, метриками и рекламными кампаниями в VK, Yandex Direct и Telegram Ads. Полный редизайн интерфейса в тёмной теме, экспорт отчётов в CSV, JSON и HTML.',
    repositoryUrl: 'https://github.com/Feamlaz/CRM-Site',
    liveUrl: null,
    period: '2025 — настоящее время',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Recharts', 'Fastify', 'Prisma', 'PostgreSQL'],
    featured: true,
    sortOrder: 1,
    skills: [
      'React',
      'Fastify',
      'Prisma',
      'PostgreSQL',
      'REST',
      'CRM',
      'воронки',
      'A/B тестирование',
      'продуктовая аналитика',
    ],
  },
  {
    name: 'Subscription Aggregator',
    description:
      'Микросервис на Go для агрегации данных по подпискам. REST API с авторизацией, полный CRUD, валинация, пагинация и фильтрация, работа с PostgreSQL.',
    repositoryUrl: 'https://github.com/Feamlaz/subscription-aggregator',
    liveUrl: null,
    period: '2025 — 2026',
    tech: ['Go', 'REST', 'PostgreSQL'],
    featured: true,
    sortOrder: 2,
    skills: ['Go', 'REST', 'PostgreSQL', 'моделирование данных', 'OAuth2', 'JWT'],
  },
  {
    name: 'Sentinel',
    description:
      'Система мониторинга: проверка HTTP-эндпоинтов, SSL-сертификатов, DNS-резолва, открытых портов и сроков доменов. Живой TUI-дашборд с пульсацией при падении, веб-страница статуса со sparkline за 24 часа, предупреждение о деградации до падения.',
    repositoryUrl: 'https://github.com/Feamlaz/Sentinel',
    liveUrl: null,
    period: '2026 — активный',
    tech: ['Python', 'Click', 'Textual', 'FastAPI', 'httpx', 'SQLite'],
    featured: false,
    sortOrder: 3,
    skills: [
      'Python',
      'FastAPI',
      'SQLite',
      'Docker',
      'Linux',
      'деплой на VPS',
      'CI/CD',
    ],
  },
  {
    name: 'SubTrack',
    description:
      'CLI/TUI трекер подписок: считает расходы по месяцам и годам в разных валютах и категориях. Экспорт в CSV и JSON, алерты по upcoming renewals, данные в локальной SQLite.',
    repositoryUrl: 'https://github.com/Feamlaz/subtrack',
    liveUrl: null,
    period: '2026 — в разработке',
    tech: ['Python', 'Click', 'Textual', 'Rich', 'SQLite'],
    featured: false,
    sortOrder: 4,
    skills: ['Python', 'SQLite'],
  },
  {
    name: 'СВИТОК ЛАЙТ',
    description:
      'AI-анализ документов со structured output: извлекает ключевые поля из загруженных файлов в строгую JSON-схему. Устойчив к невалидному вводу за счёт ретраев и валидации ответа модели.',
    repositoryUrl: 'https://github.com/Feamlaz/Svitokk',
    liveUrl: null,
    period: '2026 — в разработке',
    tech: ['Python', 'Claude API', 'Structured Output', 'FastAPI'],
    featured: false,
    sortOrder: 5,
    skills: ['Python', 'FastAPI', 'REST', 'Evals', 'Docker'],
  },
  {
    name: 'Digital Product Landing',
    description:
      'Одностраничный сайт для продажи цифровых продуктов на Next.js 15 и React 19: hero, преимущества, тарифы, адаптивная вёрстка.',
    repositoryUrl: 'https://github.com/Feamlaz/digital-product-landing',
    liveUrl: null,
    period: '2026 — в разработке',
    tech: ['Next.js', 'React', 'JavaScript', 'CSS'],
    featured: false,
    sortOrder: 6,
    skills: ['Next.js', 'React', 'JavaScript', 'HTML', 'CSS'],
  },
];

async function seedProfile(): Promise<void> {
  const profile = await prisma.profile.upsert({
    where: { slug: 'main' },
    update: {
      name: 'Александр Гудзь',
      title: 'Full-stack Product Engineer',
      description:
        'Закрываю весь цикл продукта: бэкенд, данные, интеграции, платежи, фронтенд, аналитика. Довожу до продакшена и первых продаж — не останавливаюсь на «работает локально».',
      location: 'Москва',
    },
    create: {
      slug: 'main',
      name: 'Александр Гудзь',
      title: 'Full-stack Product Engineer',
      description:
        'Закрываю весь цикл продукта: бэкенд, данные, интеграции, платежи, фронтенд, аналитика. Довожу до продакшена и первых продаж — не останавливаюсь на «работает локально».',
      location: 'Москва',
    },
  });

  for (const [position, contact] of contacts.entries()) {
    await prisma.contact.upsert({
      where: { profileId_kind: { profileId: profile.id, kind: contact.kind } },
      update: { label: contact.label, value: contact.value, position },
      create: { ...contact, position, profileId: profile.id },
    });
  }
}

async function seedSkills(): Promise<Map<string, string>> {
  const ids = new Map<string, string>();

  for (const skill of skills) {
    const row = await prisma.skill.upsert({
      where: { name: skill.name },
      update: { category: skill.category },
      create: skill,
    });
    ids.set(skill.name, row.id);
  }

  return ids;
}

async function seedExperiences(skillIds: Map<string, string>): Promise<void> {
  for (const experience of experiences) {
    const row = await prisma.experience.upsert({
      where: { slug: experience.slug },
      update: {
        company: experience.company,
        position: experience.position,
        startDate: experience.startDate,
        endDate: experience.endDate,
        sortOrder: experience.sortOrder,
      },
      create: {
        slug: experience.slug,
        company: experience.company,
        position: experience.position,
        startDate: experience.startDate,
        endDate: experience.endDate,
        sortOrder: experience.sortOrder,
      },
    });

    for (const [index, text] of experience.achievements.entries()) {
      await prisma.achievement.upsert({
        where: { experienceId_position: { experienceId: row.id, position: index } },
        update: { text },
        create: { text, position: index, experienceId: row.id },
      });
    }

    const keep = experience.achievements.map((_, index) => index);
    await prisma.achievement.deleteMany({
      where: { experienceId: row.id, position: { notIn: keep } },
    });

    await prisma.experienceSkill.deleteMany({ where: { experienceId: row.id } });
    await prisma.experienceSkill.createMany({
      data: experience.skills.map((name) => ({
        experienceId: row.id,
        skillId: skillIds.get(name) as string,
      })),
    });
  }
}

async function seedProjects(skillIds: Map<string, string>): Promise<void> {
  for (const project of projects) {
    const row = await prisma.project.upsert({
      where: { name: project.name },
      update: {
        description: project.description,
        repositoryUrl: project.repositoryUrl,
        liveUrl: project.liveUrl,
        period: project.period,
        tech: project.tech,
        featured: project.featured,
        sortOrder: project.sortOrder,
      },
      create: {
        name: project.name,
        description: project.description,
        repositoryUrl: project.repositoryUrl,
        liveUrl: project.liveUrl,
        period: project.period,
        tech: project.tech,
        featured: project.featured,
        sortOrder: project.sortOrder,
      },
    });

    await prisma.projectSkill.deleteMany({ where: { projectId: row.id } });
    await prisma.projectSkill.createMany({
      data: project.skills.map((name) => ({
        projectId: row.id,
        skillId: skillIds.get(name) as string,
      })),
    });
  }
}

async function main(): Promise<void> {
  await seedProfile();
  const skillIds = await seedSkills();
  await seedExperiences(skillIds);
  await seedProjects(skillIds);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: Prisma.PrismaClientKnownRequestError | Error) => {
    console.error(error.message);
    await prisma.$disconnect();
    process.exit(1);
  });