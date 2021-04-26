export const imagesDataTest = [
    {
        "key": 0,
        "created": "6 weeks ago",
        "id": "6678c7c2e56c",
        "repository": "docker.io/library/nginx",
        "size": "131 MB",
        "tag": "1.17.10-alpine-perl"
    },
    {
        "key": 1,
        "created": "3 months ago",
        "id": "e7d92cdc71fe",
        "repository": "docker.io/library/alpine",
        "size": "5.86 MB",
        "tag": "latest"
    }
];

export const containersDataTest = [
    {
        key: 0,
        containerId: "5ae4a214e530",
        image: "registry.fedoraproject.org/f29/httpd:latest",
        command: "/usr/bin/run-http...",
        created: "4 minutes ago",
        ports: "0.0.0.0:8080->8080/tcp",
        names: "cool_kalam"
    },
    {
        key: 1,
        containerId: "1235ae4a214e530123",
        image: "second.fedoraproject.org/second",
        command: "test/test/usr/bin/run-http...",
        created: "21 minutes ago",
        ports: "1.1.1.1:8080->8080/tcp",
        names: "test_name"
    },
];

export const volumesDataTest = [
    {
        Anonymous: false,
        CreatedAt: "2020-12-14T11:56:14.6300363+01:00",
        Driver: "local",
        GID: 0,
        Labels: {},
        Mountpoint: "/home/thesis/.local/share/containers/storage/volumes/my-vol-1/_data",
        Name: "my-vol-1",
        Options: {},
        Scope: "local",
        UID: 0
    },
    {
        Anonymous: false,
        CreatedAt: "2020-12-14T11:56:20.1633446+01:00",
        Driver: "local",
        GID: 0,
        Labels: {},
        Mountpoint: "/home/thesis/.local/share/containers/storage/volumes/my-vol-2/_data",
        Name: "my-vol-2",
        Options: {},
        Scope: "local",
        UID: 0
    },
];

export const test = {
    username: "usernameTest2",
    ip: "123.456.789",
    podmanSocketPath: "/run/user/1001/podman/podman.sock",
}
export const test2 = {
    username: "usernameTest222222",
    ip: "987.654.321",
    podmanSocketPath: "/run/user/2222/podman/podman.sock",
}

export const testKey = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDWVxhhQ8l4D8mWLt61ajuTPUlKCCLyS5bO4iQRMOmYaEd3LoLDQEUxepUqbdrEgQBj1NR+mdAsSq8BmCrmB8Kgi3+Spbd1lci5ZljKYiwhC7BYytQeQAty+yEP+FB05aYy4SgIE9kEDygDhCHTNNLx1oLmCVNVOerGuAB3ovEyeaSFEJHK44/foLVTr9uOYyUoBKJKsDjiIqP4bH9CiVKe0HBsaibzcKnPlNkfYf5xnhUBcGQ7TWm7PQ2d1rw/tsnggk3W+8SF1IH190xi98uus2oo4+5aJZbe0RejJh8UTeXUS+pnaPsZrUo0RX09Mj9PNaPHzrzVuqFsTrr1l0SzQy1404wSYtXtPe00gg0TeMeVu98fXZya7rP479UNJZ+VBPM0nftnBt/0ozAXhGj2drn4ZYjzFwLkHlAPPE5gt5ruJEwxzJ80ZofTLjgfKWcubaynTvB+gmlgropgErvuZmvbmXLZY6YoCKUwh2O4m0J8/fUooQalbi5XisKQHQ0= msafpc@martinpc-virtual-machine";

// if (connections.length === 0) {
//     connections.push(test);
//     connections.push(test2);
//     activeConnection.username = test.username;
//     activeConnection.ip = test.ip;
//     activeConnection.podmanSocketPath = test.podmanSocketPath;
// }
