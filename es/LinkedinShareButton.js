import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';
function linkedinLink(url, _a) {
    var title = _a.title, summary = _a.summary, source = _a.source;
    assert(url, 'linkedin.url');
    return ('https://linkedin.com/shareArticle' +
        objectToGetParams({ url: url, mini: 'true', title: title, summary: summary, source: source }));
}
var LinkedinShareButton = createShareButton('linkedin', linkedinLink, function (_a) {
    var title = _a.title, summary = _a.summary, source = _a.source;
    return ({ title: title, summary: summary, source: source });
}, {
    windowWidth: 750,
    windowHeight: 600,
});
export default LinkedinShareButton;
