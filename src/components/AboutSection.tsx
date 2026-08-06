import { useState } from "react";
import type { Locale, Pillar, ProfileBundle } from "../data/profile";

type Props = { locale: Locale; content: ProfileBundle };

/**
 * Группа технологий: видно ядро, глубина раскрывается наведением (десктоп),
 * нажатием (тач) или фокусом с клавиатуры. Скрытые чипы всё равно лежат
 * в HTML — пререндер отдаёт их поисковикам и AI-краулерам целиком.
 */
function PillarGroup({ pillar, moreLabel, lessLabel }: {
  pillar: Pillar;
  moreLabel: (n: number) => string;
  lessLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const core = pillar.body.split(" · ");
  const more = pillar.more ? pillar.more.split(" · ") : [];

  return (
    <div className={`tag-group${open ? " is-open" : ""}`}>
      <h3>{pillar.label}</h3>
      <p className="tag-group-intro">{pillar.intro}</p>
      <div className="tag-list">
        {core.map((tag) => (
          <span className="chip" key={tag}>
            {tag.trim()}
          </span>
        ))}
        {more.map((tag) => (
          <span className="chip chip-more" key={tag}>
            {tag.trim()}
          </span>
        ))}
        {more.length > 0 && (
          <button
            type="button"
            className="tag-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {open ? lessLabel : moreLabel(more.length)}
          </button>
        )}
      </div>
    </div>
  );
}

export function AboutSection({ locale, content }: Props) {
  const aboutTextRu =
    "12+ лет в корпоративной IT-инфраструктуре. Начинал с поддержки пользователей и системного администрирования в IT-аутсорсе, постепенно дорос до архитектора систем полного цикла — от серверной комнаты и сетей до AI-агентов в эксплуатации. Одинаково уверенно собираю инфраструктуру с нуля, автоматизирую сложные бизнес-процессы агентными системами и встраиваю нейросети в реальные рабочие потоки.";

  const aboutTextEn =
    "12+ years in corporate IT infrastructure. Started in user support and sysadmin work at an MSP, grew into a systems architect covering the full stack — from bare metal and networks to AI agents in production. Equally comfortable building infrastructure from scratch, automating complex business processes with agent-based systems, and shipping LLMs into real workflows.";

  const aboutTextZh =
    "12+ 年俄罗斯企业 IT 基础设施经验。从 IT 外包的用户支持与系统管理起步,逐步成长为全栈系统架构师,技术覆盖机房、网络、虚拟化、AD / Exchange,直至生产环境的 AI 智能体。同样擅长:从零搭建基础设施、通过 AI 智能体自动化复杂业务流程、把 LLM 落地到真实业务流程中。专注为出海俄罗斯市场的中国科技企业提供本地化部署、数据合规(152-ФЗ)与跨境基础设施集成(1C / Yandex Cloud / VK Cloud)。";

  const aboutText2Ru =
    "Работаю по простым правилам: сначала понять, зачем это бизнесу; перед изменением — план отката; после — документация, чтобы система жила и без меня. Отдельная слабость — легаси, которое «нельзя трогать»: люблю доводить его до состояния, когда трогать не страшно.";

  const aboutText2En =
    "I work by simple rules: understand why the business needs it first, have a rollback plan before any change, and document after — so the system outlives my involvement. My soft spot is legacy that “must not be touched”: I enjoy getting it to a state where touching it isn’t scary.";

  const aboutText2Zh =
    "我的工作原则很简单:先弄清业务为什么需要;任何变更之前先准备回滚方案;完成之后写好文档,让系统离开我也能稳定运行。我对那些「谁都不敢动」的遗留系统情有独钟,喜欢把它们整治到谁都敢动的状态。";

  const eyebrow = locale === "ru" ? "О себе" : locale === "zh" ? "关于" : "About";
  const aboutText =
    locale === "ru" ? aboutTextRu : locale === "zh" ? aboutTextZh : aboutTextEn;
  const aboutText2 =
    locale === "ru" ? aboutText2Ru : locale === "zh" ? aboutText2Zh : aboutText2En;

  const moreLabel = (n: number) =>
    locale === "ru" ? `+ ещё ${n}` : locale === "zh" ? `+ 还有 ${n} 项` : `+ ${n} more`;
  const lessLabel = locale === "ru" ? "свернуть" : locale === "zh" ? "收起" : "collapse";

  return (
    <section id="about" className="block">
      <p className="block-eyebrow-mobile">{eyebrow}</p>
      <p className="about-text">{aboutText}</p>
      <p className="about-text">{aboutText2}</p>

      {content.hero.pillars.map((pillar) => (
        <PillarGroup
          key={pillar.label}
          pillar={pillar}
          moreLabel={moreLabel}
          lessLabel={lessLabel}
        />
      ))}
    </section>
  );
}
