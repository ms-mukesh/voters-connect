import React from 'react';
interface SvgImageType {
    Source?: any;
    height?: any;
    width?: any;
    style?: any;
}
const SvgImage = (props: SvgImageType) => {
    const { Source = null } = props;
    return Source === null ? null : <Source {...props} />;
};
export default SvgImage;
