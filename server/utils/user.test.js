const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'sourabh',
            room: 'Office buddy'
        },
        {
            id: 2,
            name: 'shashi',
            room: 'Friends'
        }, {
            id: 3,
            name: 'Kumar',
            room: 'Friends'
        }];
    });
    it('should add a new user', () => {
        var users = new Users();
        var user = {
            id: '123hh',
            name: 'Sourabh',
            room: 'Friends'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });
    it('should remove a user', () => {
        var userId = 3
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);

    });
    it('should not remove a user', () => {
        var userId = '300'
        var user = users.removeUser(userId);
        expect(user).toNotExist();
    });

    it('should find a user', () => {
        var userId = 2
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);

    });
    it('should not find a user', () => {
        var userId = '200'
        var user = users.getUser(userId);
        expect(user).toNotExist();
    });

    it('should retrun name for Friends', () => {
        var userList = users.getUserList('Friends');
        expect(userList).toEqual(['shashi', 'kumar']);
    });
    it('should retrun name for Office buddy', () => {
        var userList = users.getUserList('Office buddy');
        expect(userList).toEqual(['sourabh'])
    });
});