# Migrate v1 to v2 guide

## Share buttons

### Before (v1)

```js
import { ShareButtons } from 'react-share';

const {
  FacebookShareButton,
  TwitterShareButton,
} = ShareButtons;
```

### After (v2)

```js
import {
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share';
```

## Share counts

### Before (v1)

```js
import { ShareCounts } from 'react-share';

const {
  FacebookShareCount,
  GooglePlusShareCount,
} = ShareCounts;
```

### After (v2)

```js
import {
  FacebookShareCount,
  GooglePlusShareCount,
} from 'react-share';
```

## Icons

### Before (v1)

```js
import { generateShareIcon } from 'react-share';

const FacebookIcon = generateShareIcon('facebook');
```

### After (v2)

```js
import { FacebookIcon } from 'react-share';
```
