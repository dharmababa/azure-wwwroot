var Corners = (function () {
    "use strict";

    function append(target) {
        var corner = document.createElement("div");
        //corner.zIndex = target.zIndex + 1;
        //corner.zIndex = 1;
        corner.className = "corner";

        var topLeft = corner.cloneNode();
        topLeft.className += " topLeft";
        var topRight = corner.cloneNode();
        topRight.className += " topRight";
        var bottomRight = corner.cloneNode();
        bottomRight.className += " bottomRight";
        var bottomLeft = corner.cloneNode();
        bottomLeft.className += " bottomLeft";

        target.appendChild(topLeft);
        target.appendChild(topRight);
        target.appendChild(bottomRight);
        target.appendChild(bottomLeft);
        target._pinned = true;
        target.style.zIndex = -1;
    }

    function remove(target) {
        var children = target.childNodes;
        for (var c = children.length - 1; c >= 0; c--) {
            target.removeChild(children[c]);
        }
        target._pinned = false;
    }

    return {
        "append": append,
        "remove": remove
    }
}());