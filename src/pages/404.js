import { m } from 'framer-motion';
import Head from 'next/head';
import NextLink from 'next/link';
import { Button, Typography } from '@mui/material';
import CompactLayout from 'src/layouts/compact';
import { MotionContainer, varBounce } from 'src/components/animate';
import { PageNotFoundIllustration } from 'src/assets/illustrations';

Page404.getLayout = (page) => <CompactLayout>{page}</CompactLayout>;

export default function Page404() {
  return (
    <>
      <Head>
        <title> Хуудас олдсонгүй!</title>
      </Head>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Уучлаарай, хуудас олдсонгүй!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>
        <Button component={NextLink} href="/" size="large" variant="contained">
          Нүүр хуудас
        </Button>
      </MotionContainer>
    </>
  );
}
