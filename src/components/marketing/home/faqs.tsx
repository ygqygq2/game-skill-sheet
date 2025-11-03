'use client';

import { Badge, Box, Card, Container, Stack, Text } from '@chakra-ui/react';
import { Collapsible } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import * as React from 'react';

const faqs = [
  {
    id: 'FAQ-1',
    question: 'Do you have a free demo to review the code before purchasing?',
    answer:
      'Yes, you can check out our open source dashboard template which should give you an overview of the code quality and folder structure. Keep in mind that some aspects may differ from this Paid version.',
  },
  {
    id: 'FAQ-2',
    question: 'How many projects can I build with Chinge Admin?',
    answer:
      "The license is per project (domain), but if you intend to develop an unknown number of projects feel free to contact us and we'll find a solution.",
  },
  {
    id: 'FAQ-3',
    question: 'How many projects can I build with this template?',
    answer:
      'Absolutely! If you intend to charge users for using your product Extended license is created specifically for this context.',
  },
  {
    id: 'FAQ-4',
    question: 'What browsers does the template support?',
    answer:
      "The components in Chakra are designed to work in the latest, stable releases of all major browsers, including Chrome, Firefox, Safari, and Edge. We don't support Internet Explorer 11.",
  },
  {
    id: 'FAQ-5',
    question: 'For what kind of projects is the Standard license intended?',
    answer:
      'The Standard license is designed for internal applications in which staff will access the application. An example could be the back-office dashboard of a public-facing e-commerce website in which staff would sign in and manage inventory, customers, etc.',
  },
] satisfies { id: string; question: string; answer: string }[];

export function Faqs(): React.JSX.Element {
  return (
    <Box
      bg="bg.muted"
      py="120px"
    >
      <Container maxW="900px">
        <Stack gap={16}>
          <Stack
            maxWidth="700px"
            mx="auto"
          >
            <Stack gap={4}>
              <Box
                display="flex"
                justifyContent="center"
              >
                <Badge
                  variant="solid"
                  display="inline-flex"
                  alignItems="center"
                  px={2}
                  py={1}
                  borderRadius="md"
                  textTransform="none"
                >
                  <Icon
                    icon="ph:question"
                    fontSize="md"
                    style={{ marginRight: '8px' }}
                  />
                  FAQ
                </Badge>
              </Box>
              <Text
                textAlign="center"
                fontSize="2.25rem"
                fontWeight="500"
                lineHeight="1.2"
              >
                Questions we get asked
              </Text>
              <Text color="gray.500">
                Have another question you do not see here? Contact us by{' '}
                <a
                  href="mailto:ygqygq2@qq.com"
                  style={{ color: 'var(--chakra-colors-blue-600)', textDecoration: 'underline' }}
                >
                  email
                </a>
                .
              </Text>
            </Stack>
          </Stack>
          <Stack gap={4}>
            {faqs.map((faq) => (
              <Faq
                key={faq.id}
                {...faq}
              />
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export interface FaqProps {
  answer: string;
  question: string;
}

function Faq({ answer, question }: FaqProps): React.JSX.Element {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  return (
    <Card.Root p={6}>
      <Card.Body>
        <Stack
          onClick={() => {
            setIsExpanded((prevState) => !prevState);
          }}
          cursor="pointer"
        >
          <Stack
            direction="row"
            gap={4}
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="lg">{question}</Text>
            {isExpanded ? (
              <Icon
                icon="ph:caret-down"
                fontSize="1.2em"
              />
            ) : (
              <Icon
                icon="ph:caret-right"
                fontSize="1.2em"
              />
            )}
          </Stack>
          <Collapsible.Root open={isExpanded}>
            <Collapsible.Content>
              <Text
                color="gray.500"
                pt={6}
                fontSize="sm"
              >
                {answer}
              </Text>
            </Collapsible.Content>
          </Collapsible.Root>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}
