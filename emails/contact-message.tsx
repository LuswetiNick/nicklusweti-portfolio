import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "react-email";

type ContactMessageEmailProps = {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
};

const ContactMessageEmail = ({
  name = "Test Visitor",
  email = "visitor@example.com",
  inquiryType = "Employment Opportunity",
  message =
    "I’m interested in discussing a software development opportunity with you.",
}: ContactMessageEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>
      New {inquiryType.toLowerCase()} from {name}
    </Preview>
    <Body style={body}>
      <Container style={container}>
        <Text style={eyebrow}>NICK LUSWETI · PORTFOLIO INQUIRY</Text>
        <Heading style={heading}>New message from {name}</Heading>
        <Text style={intro}>
          A visitor submitted the contact form on your portfolio.
        </Text>

        <Hr style={rule} />

        <Section style={details}>
          <Text style={label}>INQUIRY TYPE</Text>
          <Text style={value}>{inquiryType}</Text>

          <Text style={label}>REPLY TO</Text>
          <Link href={`mailto:${email}`} style={emailLink}>
            {email}
          </Link>
        </Section>

        <Section style={messagePanel}>
          <Text style={label}>MESSAGE</Text>
          <Text style={messageText}>{message}</Text>
        </Section>

        <Hr style={rule} />
        <Text style={footer}>
          Replying to this email will send your response directly to {name}.
        </Text>
      </Container>
    </Body>
  </Html>
);

const body = {
  margin: "0",
  backgroundColor: "#0f0f10",
  color: "#f4f3ef",
  fontFamily: "Arial, Helvetica, sans-serif",
};

const container = {
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  padding: "48px 28px",
};

const eyebrow = {
  margin: "0 0 20px",
  color: "#32d74b",
  fontSize: "11px",
  letterSpacing: "1.5px",
};

const heading = {
  margin: "0",
  color: "#f4f3ef",
  fontSize: "38px",
  fontWeight: "700",
  letterSpacing: "-1.2px",
  lineHeight: "1.05",
};

const intro = {
  margin: "18px 0 0",
  color: "#aaa9a6",
  fontSize: "16px",
  lineHeight: "1.6",
};

const rule = {
  margin: "32px 0",
  borderColor: "#303031",
};

const details = {
  margin: "0 0 32px",
};

const label = {
  margin: "0 0 7px",
  color: "#777775",
  fontSize: "10px",
  letterSpacing: "1.4px",
};

const value = {
  margin: "0 0 24px",
  color: "#f4f3ef",
  fontSize: "16px",
  lineHeight: "1.5",
};

const emailLink = {
  display: "inline-block",
  margin: "0",
  color: "#32d74b",
  fontSize: "16px",
  lineHeight: "1.5",
  textDecoration: "none",
};

const messagePanel = {
  borderRadius: "14px",
  backgroundColor: "#181819",
  padding: "24px",
};

const messageText = {
  margin: "12px 0 0",
  color: "#f4f3ef",
  fontSize: "16px",
  lineHeight: "1.7",
  overflowWrap: "anywhere" as const,
  whiteSpace: "pre-wrap" as const,
};

const footer = {
  margin: "0",
  color: "#777775",
  fontSize: "12px",
  lineHeight: "1.6",
};

export default ContactMessageEmail;
