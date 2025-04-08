// @ts-check
const { i18n } = require("./next-i18next.config");

if (process.env.NEXT_PUBLIC_CMS_BASE_URL) {
  const cmsBaseURL = new URL(process.env.NEXT_PUBLIC_CMS_BASE_URL);
  /**
   * @type {import('next').NextConfig}
   **/
  module.exports = {
    reactStrictMode: false,
    i18n,
    output: "standalone",
    headers,
    images: {
      remotePatterns: [
        {
          protocol: cmsBaseURL.protocol.replace(":", ""),
          hostname: cmsBaseURL.hostname,
          port: cmsBaseURL.port,
        },
        {
          protocol: "https",
          hostname: "i.ytimg.com",
          port: "",
        },
      ],
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
        ],
      });

      return config;
    },
  };
}

const contentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *.greenhouse.io *.vercel.live vercel.live;
    child-src *.greenhouse.io *.vercel.live vercel.live;
    style-src 'self' 'unsafe-inline';
    img-src 'self' *.vercel.com vercel.com blob: data:;
    media-src 'none';
    connect-src *;
    font-src 'self';
`;

async function headers() {
  return [
    {
      // Apply these headers to all routes in your application.
      source: "/:path*",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        // {
        //   key: "Content-Security-Policy",
        //   value: contentSecurityPolicy.replace(/\n/g, ""),
        // },
      ],
    },
  ];
}
