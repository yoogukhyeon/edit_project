import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SEOPageKey, seoContent } from 'constants/seoContent';

type SEOContentProps = {
  page: SEOPageKey;
};

const SEOContent = ({ page }: SEOContentProps) => {
  const content = seoContent[page];
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="mt-10 border-t border-gray-200 pt-8 text-gray-700 dark:border-gray-700 dark:text-gray-200">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
      </Helmet>
      <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">{content.title}</h2>
      <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">{content.intro}</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {content.sections.map((section) => (
          <article key={section.heading} className="rounded-md border border-gray-200 p-4 dark:border-gray-700">
            <h3 className="mb-2 text-base font-semibold text-gray-900 dark:text-white">{section.heading}</h3>
            <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">{section.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">자주 묻는 질문</h2>
        <div className="space-y-3">
          {content.faqs.map((faq) => (
            <details key={faq.question} className="rounded-md border border-gray-200 p-4 dark:border-gray-700">
              <summary className="cursor-pointer text-sm font-semibold text-gray-900 dark:text-white">{faq.question}</summary>
              <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <nav className="mt-8" aria-label="관련 웹툴">
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">함께 쓰기 좋은 웹툴</h2>
        <ul className="flex flex-wrap gap-2">
          {content.related.map((link) => (
            <li key={link.path}>
              <Link
                className="inline-block rounded-md bg-slate-100 px-3 py-2 text-sm text-gray-700 hover:bg-sky-100 dark:bg-gray-800 dark:text-gray-200"
                to={link.path}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default SEOContent;
