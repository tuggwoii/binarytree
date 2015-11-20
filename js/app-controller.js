app.controller('AppController', function ($scope) {

    //EXAMPLE POSTFIX
    $scope.postfix = '251-*32*+';

    function isdigit(c) {
        if (c != '+' && c != '-' && c != '*' && c != '/') {
            return true;
        }
        return false;
    }

    function top(stack) {
        return stack[stack.length - 1];
    }

    function createTree(postfix, size) {
        var stack = [];
        for (i = 0; i < size; i++) {
            var char = postfix[i];
            if (isdigit(char)) {
                stack.push({ name: char });
            }
            else {
                var elm1 = top(stack);
                stack.pop();
                var elm2 = top(stack);
                stack.pop();
                var operation = {
                    name: char
                };
                operation.left = elm1;
                operation.right = elm2;
                stack.push(operation);
            }
        }
        return stack.pop();
    }


    $scope.process = function () {
        var chars = $scope.postfix.split('');
        var size = chars.length;
        var result = createTree(chars, size);

        $scope.trees = result;
    }

    $scope.clearActive = function (tree) {
        tree.active = false;
        if (tree.left) {
            $scope.clearActive(tree.left);
        }
        if (tree.right) {
            $scope.clearActive(tree.right);
        }
    }

    $scope.calculate = function (tree) {
        $scope.clearActive($scope.trees);
        tree.active = true;
        if (isdigit(tree.name)) {
            $scope.result = tree.name;
        }
        else {
            $scope.result = $scope.recursiveState(tree) + " = " + $scope.recursiveCalc(tree);
        }
    }

    $scope.recursiveState = function (tree) {
        var str = "";
        if (tree.right) {
            if (isdigit(tree.right.name)) {
                str += tree.right.name + " " + tree.name;
            }
            else {
                str += "(" + $scope.recursiveState(tree.right) + ") " + tree.name;
            }
        }
        if (tree.left) {
            if (isdigit(tree.left.name)) {
                str += " " + tree.left.name;
            }
            else {
                str += " (" + $scope.recursiveState(tree.left) + ")";
            }
        }
        return str;
    }

    $scope.recursiveCalc = function (tree) {
        var result = 0;
        var right = 0;
        var left = 0;

        if (tree.right) {
            if (isdigit(tree.right.name)) {
                right = parseInt(tree.right.name);
            }
            else {
                right = $scope.recursiveCalc(tree.right);
            }
        }
        if (tree.left) {
            if (isdigit(tree.left.name)) {
                left = parseInt(tree.left.name);
            }
            else {
                left = $scope.recursiveCalc(tree.left);
            }
        }
        if(tree.name === '+') {
            result = right + left;
        }
        else if (tree.name === '-') {
            result = right - left;
        }
        else if (tree.name === '*') {
            result = right * left;
        }
        else if (tree.name === '/') {
            result = right / left;;
        }

        return result;
    }


    $scope.expand = function (tree) {
        if (tree.expand) {
            tree.expand = false;
        }
        else {
            tree.expand = true;
        }
    }

});