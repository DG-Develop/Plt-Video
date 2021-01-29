import gravatar from '../../utils/gravatar'

test('Gravatar Function test', () => {
    const email = "dgdband@gmail.com"
    const gravatarUrl = 'https://gravatar.com/avatar/d36785eb557425254e833b456ae10b73'

    expect(gravatarUrl).toEqual(gravatar(email))
})