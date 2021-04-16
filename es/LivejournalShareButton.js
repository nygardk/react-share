import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';
function livejournalLink(url, _a) {
    var title = _a.title, description = _a.description;
    assert(url, 'livejournal.url');
    return ('https://www.livejournal.com/update.bml' +
        objectToGetParams({
            subject: title,
            event: description,
        }));
}
var LivejournalShareButton = createShareButton('livejournal', livejournalLink, function (props) { return ({
    title: props.title,
    description: props.description,
}); }, {
    windowWidth: 660,
    windowHeight: 460,
});
export default LivejournalShareButton;
