import type { Locale, ProfileBundle } from "../data/profile";

type Props = { locale: Locale; content: ProfileBundle };

/**
 * Верхний блок — только человеческий текст, без перечисления технологий.
 * Стек живёт ниже, в отдельной секции: страница углубляется по мере прокрутки.
 */
export function AboutSection({ locale }: Props) {
  const aboutTextRu =
    "12+ лет в корпоративной IT-инфраструктуре. Начинал в аутсорсе с поддержки пользователей и админства. Дорос до архитектора полного цикла: серверная, сети, виртуализация, AD и Exchange, дальше AI-агенты в эксплуатации. Собираю инфраструктуру с нуля и автоматизирую то, что повторяется. Нейросети встраиваю в рабочие процессы, а не в презентации.";

  const aboutTextEn =
    "12+ years in corporate IT infrastructure. Started at an MSP doing user support and sysadmin work. Grew into a full-stack architect: bare metal, networks, virtualization, AD and Exchange, then AI agents in production. I build infrastructure from scratch and automate whatever repeats. LLMs go into real workflows, not into slide decks.";

  const aboutTextZh =
    "12+ 年俄罗斯企业 IT 基础设施经验。从 IT 外包的用户支持与系统管理起步，逐步成长为全栈系统架构师，技术覆盖机房、网络、虚拟化、AD / Exchange,直至生产环境的 AI 智能体。同样擅长：从零搭建基础设施、通过 AI 智能体自动化复杂业务流程、把 LLM 落地到真实业务流程中。专注为出海俄罗斯市场的中国科技企业提供本地化部署、数据合规(152-ФЗ)与跨境基础设施集成(1C / Yandex Cloud / VK Cloud)。";

  const aboutText2Ru =
    "Правила простые. Сначала понять, зачем это бизнесу. Перед изменением план отката, после документация, чтобы система жила без меня. Отдельная слабость: легаси, которое «нельзя трогать». Люблю доводить его до состояния, когда трогать не страшно.";

  const aboutText2En =
    "The rules are simple. Understand why the business needs it. Have a rollback plan before the change, write the docs after, so the system outlives my involvement. My soft spot is legacy that “must not be touched”. I like getting it to a state where touching it isn’t scary.";

  const aboutText2Zh =
    "我的工作原则很简单：先弄清业务为什么需要；任何变更之前先准备回滚方案；完成之后写好文档，让系统离开我也能稳定运行。我对那些「谁都不敢动」的遗留系统情有独钟，喜欢把它们整治到谁都敢动的状态。";

  const eyebrow = locale === "ru" ? "О себе" : locale === "zh" ? "关于" : "About";
  const aboutText =
    locale === "ru" ? aboutTextRu : locale === "zh" ? aboutTextZh : aboutTextEn;
  const aboutText2 =
    locale === "ru" ? aboutText2Ru : locale === "zh" ? aboutText2Zh : aboutText2En;

  return (
    <section id="about" className="block">
      <p className="block-eyebrow-mobile">{eyebrow}</p>
      <p className="about-text">{aboutText}</p>
      <p className="about-text about-text-last">{aboutText2}</p>
    </section>
  );
}
