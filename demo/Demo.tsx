import React from 'react';
import {
  BlueskyIcon,
  BlueskyShareButton,
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  GabIcon,
  GabShareButton,
  HatenaIcon,
  HatenaShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  LivejournalIcon,
  LivejournalShareButton,
  MailruIcon,
  MailruShareButton,
  OKIcon,
  OKShareButton,
  PinterestIcon,
  PinterestShareButton,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  ThreadsIcon,
  ThreadsShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  VKIcon,
  VKShareButton,
  WeiboIcon,
  WeiboShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceIcon,
  WorkplaceShareButton,
  XIcon,
} from '../src';

import './Demo.css';
import exampleImage from './react-share-pin-example.png';

export function Demo() {
  const shareUrl = 'http://github.com';
  const title = 'GitHub';

  return (
    <div className="Demo__container">
      <div className="Demo__some-network">
        <FacebookShareButton
          aria-label="Share on Facebook"
          url={shareUrl}
          className="Demo__some-network__share-button"
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>

      <div className="Demo__some-network">
        <FacebookMessengerShareButton
          aria-label="Share in Messenger"
          url={shareUrl}
          appId="521270401588372"
          className="Demo__some-network__share-button"
        >
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>
      </div>

      <div className="Demo__some-network">
        <TwitterShareButton
          aria-label="Share on X"
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <XIcon size={32} round />
        </TwitterShareButton>
      </div>

      <div className="Demo__some-network">
        <TelegramShareButton
          aria-label="Share on Telegram"
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
      </div>

      <div className="Demo__some-network">
        <WhatsappShareButton
          aria-label="Share on WhatsApp"
          url={shareUrl}
          title={title}
          separator=":: "
          className="Demo__some-network__share-button"
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>

      <div className="Demo__some-network">
        <LinkedinShareButton
          aria-label="Share on LinkedIn"
          url={shareUrl}
          className="Demo__some-network__share-button"
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>

      <div className="Demo__some-network">
        <PinterestShareButton
          aria-label="Pin on Pinterest"
          url={String(window.location)}
          media={`${String(window.location)}/${exampleImage}`}
          className="Demo__some-network__share-button"
        >
          <PinterestIcon size={32} round />
        </PinterestShareButton>
      </div>

      <div className="Demo__some-network">
        <VKShareButton
          aria-label="Share on VK"
          url={shareUrl}
          image={`${String(window.location)}/${exampleImage}`}
          className="Demo__some-network__share-button"
        >
          <VKIcon size={32} round />
        </VKShareButton>
      </div>

      <div className="Demo__some-network">
        <OKShareButton
          aria-label="Share on OK"
          url={shareUrl}
          image={`${String(window.location)}/${exampleImage}`}
          className="Demo__some-network__share-button"
        >
          <OKIcon size={32} round />
        </OKShareButton>
      </div>

      <div className="Demo__some-network">
        <RedditShareButton
          aria-label="Share on Reddit"
          url={shareUrl}
          title={title}
          windowWidth={660}
          windowHeight={460}
          className="Demo__some-network__share-button"
        >
          <RedditIcon size={32} round />
        </RedditShareButton>
      </div>

      <div className="Demo__some-network">
        <GabShareButton
          aria-label="Share on Gab"
          url={shareUrl}
          title={title}
          windowWidth={660}
          windowHeight={640}
          className="Demo__some-network__share-button"
        >
          <GabIcon size={32} round />
        </GabShareButton>
      </div>

      <div className="Demo__some-network">
        <TumblrShareButton
          aria-label="Share on Tumblr"
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <TumblrIcon size={32} round />
        </TumblrShareButton>
      </div>

      <div className="Demo__some-network">
        <LivejournalShareButton
          aria-label="Share on LiveJournal"
          url={shareUrl}
          title={title}
          description={shareUrl}
          className="Demo__some-network__share-button"
        >
          <LivejournalIcon size={32} round />
        </LivejournalShareButton>
      </div>

      <div className="Demo__some-network">
        <MailruShareButton
          aria-label="Share on Mail.ru"
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <MailruIcon size={32} round />
        </MailruShareButton>
      </div>

      <div className="Demo__some-network">
        <EmailShareButton
          aria-label="Share by email"
          url={shareUrl}
          subject={title}
          body="body"
          className="Demo__some-network__share-button"
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>

      <div className="Demo__some-network">
        <ViberShareButton
          aria-label="Share on Viber"
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <ViberIcon size={32} round />
        </ViberShareButton>
      </div>

      <div className="Demo__some-network">
        <WorkplaceShareButton
          aria-label="Share on Workplace"
          url={shareUrl}
          quote={title}
          className="Demo__some-network__share-button"
        >
          <WorkplaceIcon size={32} round />
        </WorkplaceShareButton>
      </div>

      <div className="Demo__some-network">
        <LineShareButton
          aria-label="Share on Line"
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <LineIcon size={32} round />
        </LineShareButton>
      </div>

      <div className="Demo__some-network">
        <WeiboShareButton
          aria-label="Share on Weibo"
          url={shareUrl}
          title={title}
          image={`${String(window.location)}/${exampleImage}`}
          className="Demo__some-network__share-button"
        >
          <WeiboIcon size={32} round />
        </WeiboShareButton>
      </div>

      <div className="Demo__some-network">
        <PocketShareButton
          aria-label="Save to Pocket"
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <PocketIcon size={32} round />
        </PocketShareButton>
      </div>

      <div className="Demo__some-network">
        <InstapaperShareButton
          aria-label="Save to Instapaper"
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <InstapaperIcon size={32} round />
        </InstapaperShareButton>
      </div>

      <div className="Demo__some-network">
        <HatenaShareButton
          aria-label="Share on Hatena"
          url={shareUrl}
          title={title}
          windowWidth={660}
          windowHeight={460}
          className="Demo__some-network__share-button"
        >
          <HatenaIcon size={32} round />
        </HatenaShareButton>
      </div>

      <div className="Demo__some-network">
        <ThreadsShareButton
          aria-label="Share on Threads"
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <ThreadsIcon size={32} round />
        </ThreadsShareButton>
      </div>

      <div className="Demo__some-network">
        <BlueskyShareButton
          aria-label="Share on Bluesky"
          url={shareUrl}
          title={title}
          windowWidth={660}
          windowHeight={460}
          className="Demo__some-network__share-button"
        >
          <BlueskyIcon size={32} round />
        </BlueskyShareButton>
      </div>
    </div>
  );
}

export default Demo;
