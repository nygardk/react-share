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
  NativeShareButton,
  NativeShareIcon,
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
  XShareButton,
} from '../src';

import './Demo.css';

const exampleImage = new URL('./react-share-pin-example.png', import.meta.url).href;

export function Demo() {
  const shareUrl = 'http://github.com';
  const title = 'GitHub';

  return (
    <div className="Demo__container">
      <div className="Demo__some-network">
        <WhatsappShareButton
          aria-label="Share on WhatsApp"
          url={shareUrl}
          message={title}
          separator=":: "
          className="Demo__some-network__share-button"
        >
          <WhatsappIcon size={32} />
        </WhatsappShareButton>
      </div>

      <div className="Demo__some-network">
        <FacebookShareButton
          aria-label="Share on Facebook"
          url={shareUrl}
          className="Demo__some-network__share-button"
        >
          <FacebookIcon size={32} />
        </FacebookShareButton>
      </div>

      <div className="Demo__some-network">
        <XShareButton
          aria-label="Share on X"
          url={shareUrl}
          text={title}
          className="Demo__some-network__share-button"
        >
          <XIcon size={32} />
        </XShareButton>
      </div>

      <div className="Demo__some-network">
        <FacebookMessengerShareButton
          aria-label="Share in Messenger"
          url={shareUrl}
          appId="521270401588372"
          className="Demo__some-network__share-button"
        >
          <FacebookMessengerIcon size={32} />
        </FacebookMessengerShareButton>
      </div>

      <div className="Demo__some-network">
        <LinkedinShareButton
          aria-label="Share on LinkedIn"
          url={shareUrl}
          className="Demo__some-network__share-button"
        >
          <LinkedinIcon size={32} />
        </LinkedinShareButton>
      </div>

      <div className="Demo__some-network">
        <TelegramShareButton
          aria-label="Share on Telegram"
          url={shareUrl}
          text={title}
          className="Demo__some-network__share-button"
        >
          <TelegramIcon size={32} />
        </TelegramShareButton>
      </div>

      <div className="Demo__some-network">
        <RedditShareButton
          aria-label="Share on Reddit"
          url={shareUrl}
          shareTitle={title}
          windowWidth={660}
          windowHeight={460}
          className="Demo__some-network__share-button"
        >
          <RedditIcon size={32} />
        </RedditShareButton>
      </div>

      <div className="Demo__some-network">
        <PinterestShareButton
          aria-label="Pin on Pinterest"
          url={String(window.location)}
          media={`${String(window.location)}/${exampleImage}`}
          className="Demo__some-network__share-button"
        >
          <PinterestIcon size={32} />
        </PinterestShareButton>
      </div>

      <div className="Demo__some-network">
        <ThreadsShareButton
          aria-label="Share on Threads"
          url={shareUrl}
          text={title}
          className="Demo__some-network__share-button"
        >
          <ThreadsIcon size={32} />
        </ThreadsShareButton>
      </div>

      <div className="Demo__some-network">
        <WeiboShareButton
          aria-label="Share on Weibo"
          url={shareUrl}
          shareTitle={title}
          image={`${String(window.location)}/${exampleImage}`}
          className="Demo__some-network__share-button"
        >
          <WeiboIcon size={32} />
        </WeiboShareButton>
      </div>

      <div className="Demo__some-network">
        <LineShareButton
          aria-label="Share on Line"
          url={shareUrl}
          text={title}
          className="Demo__some-network__share-button"
        >
          <LineIcon size={32} />
        </LineShareButton>
      </div>

      <div className="Demo__some-network">
        <BlueskyShareButton
          aria-label="Share on Bluesky"
          url={shareUrl}
          text={title}
          windowWidth={660}
          windowHeight={460}
          className="Demo__some-network__share-button"
        >
          <BlueskyIcon size={32} />
        </BlueskyShareButton>
      </div>

      <div className="Demo__some-network">
        <ViberShareButton
          aria-label="Share on Viber"
          url={shareUrl}
          message={title}
          className="Demo__some-network__share-button"
        >
          <ViberIcon size={32} />
        </ViberShareButton>
      </div>

      <div className="Demo__some-network">
        <EmailShareButton
          aria-label="Share by email"
          url={shareUrl}
          subject={title}
          body="body"
          className="Demo__some-network__share-button"
        >
          <EmailIcon size={32} />
        </EmailShareButton>
      </div>

      <div className="Demo__some-network">
        <NativeShareButton
          aria-label="Share with native share"
          text={title}
          url={shareUrl}
          className="Demo__some-network__share-button"
        >
          <NativeShareIcon size={32} />
        </NativeShareButton>
      </div>

      <div className="Demo__some-network">
        <PocketShareButton
          aria-label="Save to Pocket"
          url={shareUrl}
          shareTitle={title}
          className="Demo__some-network__share-button"
        >
          <PocketIcon size={32} />
        </PocketShareButton>
      </div>

      <div className="Demo__some-network">
        <InstapaperShareButton
          aria-label="Save to Instapaper"
          url={shareUrl}
          shareTitle={title}
          className="Demo__some-network__share-button"
        >
          <InstapaperIcon size={32} />
        </InstapaperShareButton>
      </div>

      <div className="Demo__some-network">
        <TumblrShareButton
          aria-label="Share on Tumblr"
          url={shareUrl}
          postTitle={title}
          className="Demo__some-network__share-button"
        >
          <TumblrIcon size={32} />
        </TumblrShareButton>
      </div>

      <div className="Demo__some-network">
        <VKShareButton
          aria-label="Share on VK"
          url={shareUrl}
          image={`${String(window.location)}/${exampleImage}`}
          className="Demo__some-network__share-button"
        >
          <VKIcon size={32} />
        </VKShareButton>
      </div>

      <div className="Demo__some-network">
        <OKShareButton
          aria-label="Share on OK"
          url={shareUrl}
          image={`${String(window.location)}/${exampleImage}`}
          className="Demo__some-network__share-button"
        >
          <OKIcon size={32} />
        </OKShareButton>
      </div>

      <div className="Demo__some-network">
        <MailruShareButton
          aria-label="Share on Mail.ru"
          url={shareUrl}
          shareTitle={title}
          className="Demo__some-network__share-button"
        >
          <MailruIcon size={32} />
        </MailruShareButton>
      </div>

      <div className="Demo__some-network">
        <LivejournalShareButton
          aria-label="Share on LiveJournal"
          url={shareUrl}
          shareTitle={title}
          description={shareUrl}
          className="Demo__some-network__share-button"
        >
          <LivejournalIcon size={32} />
        </LivejournalShareButton>
      </div>

      <div className="Demo__some-network">
        <HatenaShareButton
          aria-label="Share on Hatena"
          url={shareUrl}
          shareTitle={title}
          windowWidth={660}
          windowHeight={460}
          className="Demo__some-network__share-button"
        >
          <HatenaIcon size={32} />
        </HatenaShareButton>
      </div>

      <div className="Demo__some-network">
        <WorkplaceShareButton
          aria-label="Share on Workplace"
          url={shareUrl}
          quote={title}
          className="Demo__some-network__share-button"
        >
          <WorkplaceIcon size={32} />
        </WorkplaceShareButton>
      </div>

      <div className="Demo__some-network">
        <GabShareButton
          aria-label="Share on Gab"
          url={shareUrl}
          text={title}
          windowWidth={660}
          windowHeight={640}
          className="Demo__some-network__share-button"
        >
          <GabIcon size={32} />
        </GabShareButton>
      </div>
    </div>
  );
}
