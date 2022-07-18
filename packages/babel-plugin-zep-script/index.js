module.exports = function({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path) {
        if (t.isLiteral(path.node.source)) {
          if (path.node.source.value === 'zep-script') {
            path.remove();
          }
        }
      },
      MemberExpression(path) {
        if (t.isIdentifier(path.node.object)) {
          if (path.node.object.name === 'ScriptApp') {
            path.replaceWith(
              t.memberExpression(
                t.identifier('App'),
                t.identifier(path.node.property.name)
              )
            )
          } else if (path.node.object.name === 'ScriptMap') {
            path.replaceWith(
              t.memberExpression(
                t.identifier('Map'),
                t.identifier(path.node.property.name)
              )
            )
          }
        }
      }
    }
  }
}