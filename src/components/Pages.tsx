'use client';

import { motion } from 'framer-motion';
import {
  Award,
  Hand,
  Wrench,
  Truck,
  Heart,
  MapPin,
  Clock,
  Phone,
  ShoppingCart,
  CreditCard,
  Package,
  CheckCircle,
  Building,
  Mail,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { companyInfo } from '@/lib/data';

// ---------------------------------------------------------------------------
// Shared animation helpers
// ---------------------------------------------------------------------------

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

function SectionShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <h2 className="text-3xl font-bold tracking-tight" style={{ color: '#C62828' }}>
        {title}
      </h2>
      <Separator className="mb-8 mt-3" />
      {children}
    </motion.section>
  );
}

// ===========================================================================
// 1. AboutSection
// ===========================================================================

export function AboutSection() {
  const features = [
    { icon: Award, label: 'Premium Quality', desc: 'We use only carefully selected materials and never compromise on quality.' },
    { icon: Hand, label: 'Handcrafted', desc: 'Every product is carefully handmade by skilled artisans.' },
    { icon: Wrench, label: 'Master Craftsmanship', desc: 'Years of experience and refined techniques go into every piece.' },
    { icon: Truck, label: 'Fast Delivery', desc: 'We deliver your order quickly and reliably to your door.' },
  ];

  return (
    <SectionShell title="About Us">
      {/* Two-column layout */}
      <div className="grid gap-10 md:grid-cols-2">
        {/* Left – Text */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex flex-col justify-center space-y-4"
        >
          <h3 className="text-2xl font-semibold">{companyInfo.name}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {companyInfo.description}
          </p>

          <div className="space-y-2 text-sm">
            <InfoRow icon={<Building className="size-4 text-muted-foreground" />} label="Address" value={companyInfo.address} />
            <InfoRow icon={<Phone className="size-4 text-muted-foreground" />} label="Phone" value={companyInfo.phone} />
            <InfoRow icon={<Mail className="size-4 text-muted-foreground" />} label="Email" value={companyInfo.email} />
            <InfoRow icon={<Clock className="size-4 text-muted-foreground" />} label="Hours" value={companyInfo.hours} />
            <InfoRow icon={<Award className="size-4 text-muted-foreground" />} label="Founded" value={companyInfo.founded} />
          </div>
        </motion.div>

        {/* Right – Info card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          <Card className="flex h-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 to-white p-8 text-center shadow-md">
            <div
              className="mb-4 flex size-20 items-center justify-center rounded-full text-white text-2xl font-bold"
              style={{ backgroundColor: '#C62828' }}
            >
              P
            </div>
            <CardTitle className="text-xl">{companyInfo.name}</CardTitle>
            <CardDescription className="mt-1">{companyInfo.tagline}</CardDescription>
            <Separator className="my-4" />
            <p className="text-sm text-muted-foreground">
              Established in {companyInfo.founded}
            </p>
            <Badge className="mt-3" style={{ backgroundColor: '#C62828' }}>
              Handcrafted Specialists
            </Badge>
          </Card>
        </motion.div>
      </div>

      {/* Features grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div key={f.label} custom={i} initial="hidden" animate="visible" variants={fadeInUp}>
            <Card className="flex flex-col items-center gap-3 p-6 text-center rounded-2xl hover:shadow-lg transition-shadow">
              <div
                className="flex size-14 items-center justify-center rounded-full"
                style={{ backgroundColor: '#FBE9E7' }}
              >
                <f.icon className="size-6" style={{ color: '#C62828' }} />
              </div>
              <h4 className="font-semibold">{f.label}</h4>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <span className="font-medium text-muted-foreground w-20 shrink-0">{label}</span>
      <span>{value}</span>
    </div>
  );
}

// ===========================================================================
// 2. GuideSection
// ===========================================================================

export function GuideSection() {
  const faqs = [
    {
      q: 'What payment methods do you accept?',
      a: 'We accept credit cards (Visa, Mastercard, JCB, American Express), bank transfers, and cash on delivery.',
    },
    {
      q: 'How long does shipping take?',
      a: 'Orders are typically shipped within 3–5 business days after confirmation. Remote islands and some areas may require additional time.',
    },
    {
      q: 'Can I return or exchange items?',
      a: 'Returns and exchanges are accepted within 30 days of delivery, provided the item is unused and in its original packaging. Please contact us for details.',
    },
    {
      q: 'Do you offer gift wrapping?',
      a: 'Yes! We offer free gift wrapping. Please note your request in the order comments. Gift tags are also available.',
    },
  ];

  const steps = [
    { icon: ShoppingCart, title: 'Select Products', desc: 'Browse and choose your favorite items.' },
    { icon: Package, title: 'Add to Cart', desc: 'Review your selections in the cart.' },
    { icon: CreditCard, title: 'Checkout', desc: 'Choose your payment method and place your order.' },
    { icon: CheckCircle, title: 'Receive Your Order', desc: 'Sit back — we deliver right to your door.' },
  ];

  return (
    <SectionShell title="User Guide">
      {/* FAQ Accordion */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mb-12"
      >
        <h3 className="mb-4 text-xl font-semibold">Frequently Asked Questions</h3>
        <Card className="rounded-2xl">
          <CardContent className="p-2">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="px-4 text-base font-medium">
                    Q: {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 text-sm leading-relaxed text-muted-foreground">
                    A: {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>

      {/* Steps */}
      <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.15 }}>
        <h3 className="mb-6 text-xl font-semibold">How to Order</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div key={s.title} custom={i} initial="hidden" animate="visible" variants={fadeInUp}>
              <Card className="relative flex flex-col items-center gap-3 p-6 text-center rounded-2xl hover:shadow-lg transition-shadow">
                <div
                  className="flex size-14 items-center justify-center rounded-full text-white font-bold text-lg"
                  style={{ backgroundColor: '#C62828' }}
                >
                  {i + 1}
                </div>
                <s.icon className="size-6 text-muted-foreground" />
                <h4 className="font-semibold">{s.title}</h4>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 text-xl text-muted-foreground/40 lg:block">
                    →
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionShell>
  );
}

// ===========================================================================
// 3. TermsSection
// ===========================================================================

export function TermsSection() {
  return (
    <SectionShell title="Terms of Service">
      <Card className="rounded-2xl">
        <CardContent className="space-y-6 p-6 text-sm leading-relaxed text-muted-foreground">
          <TermArticle number={1} title="Scope">
            These Terms of Service (hereinafter &quot;Terms&quot;) govern the use of the website (hereinafter &quot;Site&quot;) operated by PakCrafteds (hereinafter &quot;Company&quot;) and the sale of products and related services provided through the Site (hereinafter collectively &quot;Services&quot;). By using the Services, you (hereinafter &quot;User&quot;) agree to be bound by these Terms in their entirety.
          </TermArticle>

          <TermArticle number={2} title="Account Registration">
            Users may register for an account through the method designated by the Company. Users must provide truthful and accurate information and promptly update any changes. The Company reserves the right to deny access to users who provide false registration information.
          </TermArticle>

          <TermArticle number={3} title="Usage Fees">
            No separate usage fee is charged for the Services beyond the purchase price of products. However, internet connection fees and other costs required to access the Service shall be borne by the User. All product prices are displayed inclusive of applicable taxes.
          </TermArticle>

          <TermArticle number={4} title="Product Purchases">
            <p className="mb-2">
              Users may purchase products by selecting items on the Site and completing the prescribed procedures. A purchase contract is formed when the Company receives the User&apos;s order and sends an order confirmation email.
            </p>
            <p>
              The Company may refuse to sell products in the following cases:
            </p>
            <ul className="ml-4 mt-1 list-disc space-y-1">
              <li>If registration information contains falsehoods</li>
              <li>If the User has previously violated these Terms</li>
              <li>If the Company deems the transaction inappropriate for any other reason</li>
            </ul>
          </TermArticle>

          <TermArticle number={5} title="Handling of Personal Information">
            The Company shall handle User&apos;s personal information in accordance with its Privacy Policy. Except where required by law or with User consent, the Company shall not disclose or provide collected personal information to third parties.
          </TermArticle>

          <TermArticle number={6} title="Disclaimer of Liability">
            Except in cases of intentional misconduct or gross negligence by the Company, the Company shall bear no liability for damages incurred by Users in connection with the Services. The Company shall also bear no liability for delays or interruptions in Service provision caused by force majeure events including natural disasters or communication line failures.
          </TermArticle>

          <TermArticle number={7} title="Modifications">
            The Company may modify these Terms at any time without prior notice. Modified Terms shall become effective upon posting on the Site. Continued use of the Services after modification constitutes acceptance of the revised Terms.
          </TermArticle>

          <TermArticle number={8} title="Governing Law and Jurisdiction">
            These Terms shall be governed by and construed in accordance with the laws of the United States. Any disputes arising from these Terms shall be submitted to the exclusive jurisdiction of the courts of the State of Delaware.
          </TermArticle>

          <p className="text-right text-xs pt-4">
            Effective Date: January 1, 2024<br />
            Last Updated: December 1, 2024
          </p>
        </CardContent>
      </Card>
    </SectionShell>
  );
}

function TermArticle({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-2 font-semibold text-foreground">
        Article {number} ({title})
      </h4>
      <div>{children}</div>
    </div>
  );
}

// ===========================================================================
// 4. PrivacySection
// ===========================================================================

export function PrivacySection() {
  return (
    <SectionShell title="Privacy Policy">
      <Card className="rounded-2xl">
        <CardContent className="space-y-6 p-6 text-sm leading-relaxed text-muted-foreground">
          <TermArticle number={1} title="Purpose of Use of Personal Information">
            PakCrafteds (hereinafter &quot;Company&quot;) uses personal information obtained from customers for the following purposes:
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>Processing and shipping orders and related payments</li>
              <li>Responding to customer inquiries</li>
              <li>Notifying customers about new products and promotions</li>
              <li>Improving existing services and developing new ones</li>
              <li>Complying with legal obligations</li>
            </ul>
          </TermArticle>

          <TermArticle number={2} title="Provision to Third Parties">
            The Company shall not provide customer personal information to third parties without prior consent, except where required by law. However, this does not apply in the following cases:
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>When required by law</li>
              <li>When necessary for the protection of life, body, or property and obtaining the individual&apos;s consent is difficult</li>
              <li>When particularly necessary for public health or child welfare</li>
              <li>When cooperating with government agencies in the execution of official duties</li>
            </ul>
          </TermArticle>

          <TermArticle number={3} title="Disclosure of Personal Information">
            When a customer requests disclosure of their personal information, the Company shall respond without undue delay. However, disclosure may be refused in whole or in part in the following cases:
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>When there is a risk of harming the life, body, property, or other rights of the individual or a third party</li>
              <li>When there is a risk of significantly hindering the proper execution of the Company&apos;s business</li>
              <li>When disclosure would violate other applicable laws</li>
            </ul>
            If disclosure is refused, the Company will notify the requester of the reasons.
          </TermArticle>

          <TermArticle number={4} title="Security Measures">
            The Company implements the following security measures to prevent the leakage, loss, or destruction of customer personal information:
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>Organizational measures: Appointment of a data protection officer and employee training</li>
              <li>Personnel measures: Confidentiality agreements and supervision of employees</li>
              <li>Physical measures: Access control and proper management of equipment</li>
              <li>Technical measures: Use of encrypted communications (SSL) and access log monitoring</li>
            </ul>
          </TermArticle>

          <TermArticle number={5} title="Changes to This Policy">
            The Company may modify this Privacy Policy in accordance with applicable laws. Modified policies shall become effective upon posting on the Site. In the event of significant changes, the Company will notify users on the Site.
          </TermArticle>

          <TermArticle number={6} title="Contact Us">
            For inquiries regarding this Privacy Policy, please contact us at:
            <div className="mt-3 rounded-lg bg-muted/50 p-4 text-foreground">
              <p className="font-medium">{companyInfo.name}</p>
              <p>Email: {companyInfo.email}</p>
              <p>Phone: {companyInfo.phone}</p>
            </div>
          </TermArticle>

          <p className="text-right text-xs pt-4">
            Effective Date: January 1, 2024<br />
            Last Updated: December 1, 2024
          </p>
        </CardContent>
      </Card>
    </SectionShell>
  );
}

// ===========================================================================
// 5. LegalSection
// ===========================================================================

export function LegalSection() {
  return (
    <SectionShell title="Legal Notices">
      <Card className="rounded-2xl">
        <CardContent className="space-y-5 p-6 text-sm leading-relaxed text-muted-foreground">
          <LegalRow label="Seller" value={companyInfo.name} />
          <LegalRow label="Representative" value="John Smith, CEO" />
          <LegalRow label="Address" value={companyInfo.address} />
          <LegalRow label="Phone" value={companyInfo.phone} />
          <LegalRow label="Email" value={companyInfo.email} />
          <LegalRow label="Business Hours" value={companyInfo.hours} />
          <LegalRow label="Closed" value="Saturdays, Sundays & Public Holidays" />

          <Separator />

          <LegalRow
            label="Additional Costs"
            value="Shipping: Flat rate $5.50 nationwide. Free shipping on orders over $50. Cash on delivery incurs an additional handling fee of $3.30."
          />

          <LegalRow
            label="How to Order"
            value="Orders can be placed through the shopping cart system on our website."
          />

          <LegalRow
            label="Payment Methods"
            value="Credit Cards (Visa, Mastercard, JCB, American Express), Bank Transfer, Cash on Delivery"
          />

          <LegalRow
            label="Payment Deadline"
            value="Credit Card: At time of order confirmation. Bank Transfer: Within 7 days of order confirmation. Cash on Delivery: At time of delivery."
          />

          <LegalRow
            label="Delivery Time"
            value="Orders are typically shipped within 3–5 business days after confirmation."
          />

          <LegalRow
            label="Returns & Exchanges"
            value="Returns and exchanges are accepted within 30 days of delivery, provided the item is unused and in its original packaging. Return shipping costs are covered by us. However, returns due to customer preference may incur return shipping charges."
          />

          <Separator />

          <div className="rounded-lg bg-muted/50 p-4 text-xs text-muted-foreground">
            * This notice is provided in accordance with applicable consumer protection regulations to ensure customers have access to important purchasing information.
          </div>
        </CardContent>
      </Card>
    </SectionShell>
  );
}

function LegalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[200px_1fr]">
      <dt className="font-semibold text-foreground">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

// ===========================================================================
// 6. StoreSection
// ===========================================================================

export function StoreSection() {
  const stores = [
    {
      name: 'Flagship Store',
      address: '3-15-8 Jingumae, Shibuya-ku, Tokyo',
      hours: '10:00 AM – 7:00 PM',
      phone: '03-1234-5678',
      badge: 'Flagship',
    },
    {
      name: 'Shinjuku Store',
      address: '3-14-1 Shinjuku, Shinjuku-ku, Tokyo',
      hours: '10:00 AM – 8:00 PM',
      phone: '03-5678-1234',
      badge: null,
    },
    {
      name: 'Osaka Store',
      address: '2-5-1 Shinsaibashisuji, Chuo-ku, Osaka',
      hours: '10:00 AM – 7:30 PM',
      phone: '06-9876-5432',
      badge: null,
    },
  ];

  return (
    <SectionShell title="Store Locations">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stores.map((store, i) => (
          <motion.div key={store.name} custom={i} initial="hidden" animate="visible" variants={fadeInUp}>
            <Card className="rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 flex items-center gap-2">
                <MapPin className="size-5" style={{ color: '#C62828' }} />
                <CardTitle className="text-lg">{store.name}</CardTitle>
                {store.badge && (
                  <Badge className="ml-auto text-xs" style={{ backgroundColor: '#C62828' }}>
                    {store.badge}
                  </Badge>
                )}
              </div>
              <Separator className="mb-4" />
              <div className="space-y-3 text-sm text-muted-foreground">
                <StoreInfoRow icon={<MapPin className="size-4" />} value={store.address} />
                <StoreInfoRow icon={<Clock className="size-4" />} value={store.hours} />
                <StoreInfoRow icon={<Phone className="size-4" />} value={store.phone} />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

function StoreInfoRow({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-muted-foreground/60">{icon}</div>
      <span>{value}</span>
    </div>
  );
}

// ===========================================================================
// 7. FeaturesSection (Homepage)
// ===========================================================================

export function FeaturesSection() {
  const features = [
    {
      icon: Award,
      title: 'Curated Quality',
      desc: 'We only carry premium materials and products carefully selected from around the world.',
    },
    {
      icon: Hand,
      title: 'Handcrafted',
      desc: 'Warm, artisan-made pieces finished with care by skilled craftsmen, one at a time.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      desc: 'Your order ships within 3–5 business days after confirmation.',
    },
    {
      icon: Heart,
      title: 'Reliable Support',
      desc: 'Dedicated staff provide attentive service. We also offer a 30-day return guarantee.',
    },
  ];

  return (
    <section className="bg-muted/40 py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-10 text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Why Choose <strong style={{ color: '#C62828' }}>PakCrafteds</strong>
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Quality, craftsmanship, speed, and support — delivering the best shopping experience.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div key={f.title} custom={i} initial="hidden" animate="visible" variants={fadeInUp}>
              <Card className="flex h-full flex-col items-center gap-3 rounded-2xl bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div
                  className="flex size-14 items-center justify-center rounded-full"
                  style={{ backgroundColor: '#FBE9E7' }}
                >
                  <f.icon className="size-7" style={{ color: '#C62828' }} />
                </div>
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
