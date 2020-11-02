async function editPost(event) {
    event.preventDefault();

    const id = document.location.toString().split('/')[
        document.location.toString().split('/').length - 1
    ];
    const title = document.querySelector('#title').value.trim();
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    };
};

async function deletePost(event) {
    event.preventDefault();

    const id = document.location.toString().split('/')[
        document.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    };
};

document.querySelector('#post').addEventListener('submit', editPost);
document.querySelector('#delete-btn').addEventListener('click', deletePost);