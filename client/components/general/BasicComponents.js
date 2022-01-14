const Row = () => $('<div class="row"></div>');
const Col = () => $('<div class="col"></div>');

const Dot = (color) => $(`<span style="height: 16px; width: 16px; background-color: ${color}; border-radius: 50%;display: inline-block;"></span>`);


export {Row, Col, Dot}