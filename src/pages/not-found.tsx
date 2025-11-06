import { Box, Button, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';

import helpImage from '/assets/help.png';
import { paths } from '@/paths';

import { config } from '../config';
import type { Metadata } from '../types/metadata';

const metadata = { title: `Not found | ${config.site.name}` } satisfies Metadata;

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
          @keyframes rotateIn {
            from {
              transform: rotate(0deg) scale(0.2);
              opacity: 0;
            }
            to {
              transform: rotate(360deg) scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </Helmet>
      <Box
        as="main"
        position="relative"
        minH="100vh"
        overflow="hidden"
        bg="#1e234d"
        _dark={{ bg: '#0a0e27' }}
      >
        {/* 旋转星空背景 */}
        <Box
          position="absolute"
          w="400vw"
          h="400vh"
          top="50%"
          left="50%"
          marginTop="-200vh"
          marginLeft="-200vw"
          backgroundSize="240px"
          backgroundImage="url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8yIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI0MCAyNDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0MCAyNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxyZWN0IHg9IjEwNiIgeT0iOTAiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiLz48cmVjdCB4PSI3NCIgeT0iNjMiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48cmVjdCB4PSIyMyIgeT0iNjYiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48cmVjdCB4PSI1MCIgeT0iMTEwIiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIi8+PHJlY3QgeD0iNjMiIHk9IjEyOCIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjEiIGhlaWdodD0iMSIvPjxyZWN0IHg9IjQ1IiB5PSIxNDkiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48cmVjdCB4PSI5MiIgeT0iMTUxIiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIi8+PHJlY3QgeD0iNTgiIHk9IjgiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48cmVjdCB4PSIxNDciIHk9IjMzIiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIi8+PHJlY3QgeD0iOTEiIHk9IjQzIiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIi8+PHJlY3QgeD0iMTY5IiB5PSIyOSIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjEiIGhlaWdodD0iMSIvPjxyZWN0IHg9IjE4MiIgeT0iMTkiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48cmVjdCB4PSIxNjEiIHk9IjU5IiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIi8+PHJlY3QgeD0iMTM4IiB5PSI5NSIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjEiIGhlaWdodD0iMSIvPjxyZWN0IHg9IjE5OSIgeT0iNzEiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiLz48cmVjdCB4PSIyMTMiIHk9IjE1MyIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjIiIGhlaWdodD0iMiIvPjxyZWN0IHg9IjEyOCIgeT0iMTYzIiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIi8+PHJlY3QgeD0iMjA1IiB5PSIxNzQiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48cmVjdCB4PSIxNTIiIHk9IjIwMCIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjEiIGhlaWdodD0iMSIvPjxyZWN0IHg9IjUyIiB5PSIyMTEiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiLz48cmVjdCB5PSIxOTEiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48cmVjdCB4PSIxMTAiIHk9IjE4NCIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjEiIGhlaWdodD0iMSIvPjwvc3ZnPg==)"
          style={{
            animation: 'spin 240s linear infinite',
          }}
        />

        {/* 内容区 */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="fit-content"
          textAlign="center"
          zIndex={4}
        >
          <Stack
            gap={6}
            alignItems="center"
          >
            {/* 404 文字 */}
            <Box
              position="relative"
              w="fit-content"
              h="max-content"
              overflow="hidden"
              display="flex"
              gap="0"
              alignItems="center"
              justifyContent="center"
            >
              {/* 第一个 4 */}
              <Text
                fontSize={{ base: '15rem', md: '20.4rem' }}
                fontWeight="900"
                color="white"
                lineHeight={1}
                marginRight={{ base: '-20px', md: '-40px' }}
              >
                4
              </Text>

              {/* 传送门图片作为 0 */}
              <Box
                position="relative"
                display="inline-block"
                width={{ base: '15rem', md: '20.4rem' }}
                height={{ base: '15rem', md: '20.4rem' }}
                backgroundImage={`url(${helpImage})`}
                backgroundRepeat="no-repeat"
                backgroundSize="contain"
                backgroundPosition="center"
                animation="rotateIn 0.5s ease-out"
                zIndex={2}
              />

              {/* 第二个 4 */}
              <Text
                fontSize={{ base: '15rem', md: '20.4rem' }}
                fontWeight="900"
                color="white"
                lineHeight={1}
                marginLeft={{ base: '-20px', md: '-40px' }}
              >
                4
              </Text>
            </Box>

            {/* 描述文字 */}
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              fontStyle="italic"
              fontWeight="400"
              color="white"
              lineHeight="22px"
              mt={0}
            >
              您访问的页面已经移动到另一个宇宙了
            </Text>

            {/* 按钮 */}
            <Button
              asChild
              bg="#f96e4d"
              color="white"
              px={6}
              py={3}
              borderRadius="full"
              fontWeight="900"
              mt={2}
              cursor="pointer"
              border="0"
              _hover={{
                bg: '#ff5733',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.3s"
            >
              <RouterLink to={paths.home}>带我回家</RouterLink>
            </Button>
          </Stack>
        </Box>
      </Box>
    </React.Fragment>
  );
}
